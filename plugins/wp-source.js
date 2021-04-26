const axios = require('axios')
const { mapKeys, isPlainObject, trimEnd, trimStart, camelCase, upperFirst } = require('lodash')
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const TMPDIR = ".cache/downloads";

function mkdirSyncRecursive(absDirectory) {
  const paths = absDirectory.replace(/\/$/, "").split("/");
  paths.splice(0, 1);

  let dirPath = "/";
  paths.forEach((segment) => {
      dirPath += segment + "/";
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  });
}

class WPSource {
  constructor(api, options) {
    
    console.log('LOADING');
    options = options === undefined ? {} : options;
    
    this.isProd = process.env.GRIDSOME_MODE === 'static';

    this.options = {
      baseUrl: options.baseUrl || '',
      apiBase: options.apiBase || 'wp-json',
      perPage: options.perPage || 100,
      concurrent: options.concurrent || 10,
      typeName: options.typeName || 'WordPress',
      menuIds: options.menuIds || [],
      menuTypeName: options.menuTypeName || 'Menu',
      postTypes: options.postTypes || ['post'],
      localAssetUrl: options.localAssetUrl || '.cache/assets/images'
    }

    this.routes = this.options.routes || {};

    /* Create image directories */
    mkdirSyncRecursive(path.resolve(this.options.localAssetUrl));
    mkdirSyncRecursive(path.resolve(TMPDIR));
    this.tmpCount = 0;

    this.restBases = { posts: {}, taxonomies: {} };

    if (this.options.perPage > 100 || this.options.perPage < 1) {
      throw new Error(`${this.options.typeName}: perPage cannot be more than 100 or less than 1.`);
    }

    const baseUrl = trimEnd(this.options.baseUrl, '/');

    this.client = axios.create({
      baseURL: `${baseUrl}/${this.options.apiBase}`
    });

    api.loadSource(async actions => {
      this.store = actions;

      console.log(`Loading data from ${baseUrl}`);
      if (this.options.menuIds.length)
        await this.getMenus(actions);

      // await this.getPostTypes(actions);
      await this.getTaxonomies(actions);
      await this.getTypes(actions);
      await this.getPosts(actions);

    });

    api.createPages(async actions => {
      const pages = await this.fetch('/wp/v2/pages');

      for (const page of pages.data) {
        const path = page.link.replace(this.options.baseUrl, ''),
              template = page.template === '' ? 'Default' :  this.convertTemplateName(page.template);
              
        if (this.isProd) {
          this.parseAcf(page.acf);
        }

        actions.createPage({
          path,
          component: `./src/templates/${template}.vue`,
          route: {
            meta: {
              routeId: template
            }
          },
          context: {
            id: page.id,
            title: page.title.rendered,
            fields: {
              ...page.acf
            }
          }
        });
      }

      await this.createPostPages(actions);
      await this.createTaxonomyPages(actions);
    });

  }

  async getMenus(actions) {
    const menuIds = this.options.menuIds;
    const menuContentType = actions.addCollection(this.createTypeName(this.options.menuTypeName));

    for (const id of menuIds) {
      const { data } = await this.fetch(`/wp-api-menus/v2/menus/${id}`);

      const menuItems = data.items.map((item) => {

        const itemObject = {
          id: item.id,
          title: item.title,
          url: item.url.replace(this.options.baseUrl, ''),
          children: []
        }

        if (item.children) {
          itemObject['children'] = item.children.map((child) => {
            return {
              id: child.id,
              title: child.title,
              url: child.url.replace(this.options.baseUrl, '')
            }
          });
        }

        return itemObject;
      });

      menuContentType.addNode({
        id: data.ID,
        name: data.name,
        items: [
          ...menuItems
        ]
      })
    }
  }

  async getTaxonomies(actions) {
    console.log('Getting taxonomies...');
    const { data } = await this.fetch('/wp/v2/taxonomies');
    // console.log(data);
    for (let taxonomy in data) {
      taxonomy = data[taxonomy];

      const taxName = this.pascalCase(taxonomy.name)

      actions.addCollection(taxName)

      this.restBases.taxonomies[taxonomy.slug] = {
        base: taxonomy.rest_base,
        collection: taxName,
        types: taxonomy.types
      };

      // for (const type of taxonomy.types) {
      //   if (!(this.restBases.posts.hasOwnProperty(type))) {
      //     this.restBases.posts[type] = {
      //       taxonomies: {}
      //     };
      //   }
      //   this.restBases.posts[type].taxonomies[taxonomy.rest_base] = taxName;
      // }
    }

    for (let taxonomy in this.restBases.taxonomies) {
      taxonomy = this.restBases.taxonomies[taxonomy];
      taxonomy.terms = [];

      const response = await this.fetch(`/wp/v2/${taxonomy.base}`)
      if (response.data.length) {
        const taxCollection = actions.getCollection(taxonomy.collection)
        for (const term of response.data) {
          if (term.count > 0) {
            const termMeta = {
              id: term.id,
              title: term.name,
              slug: term.slug,
              count: term.count,
              location: {
                path: `/${taxonomy.base}/${term.slug}`
              }
            };
            taxCollection.addNode(termMeta);
            taxonomy.terms.push(termMeta);
          }
        }
      }
    }
  }

  async getTypes(actions) {
    console.log('Getting types...');

    const { data } = await this.fetch('/wp/v2/types');
    for (const postType of this.options.postTypes) {
      const typeData = data[postType];
      const typeCollectionName = this.pascalCase(typeData.name)
      actions.addCollection(typeCollectionName)

      if (!(this.restBases.posts.hasOwnProperty(postType))) {
        this.restBases.posts[postType] = {};
      }

      this.restBases.posts[postType].base = typeData.rest_base;
      this.restBases.posts[postType].taxonomies = typeData.taxonomies;
      this.restBases.posts[postType].name = typeData.name;
      this.restBases.posts[postType].collection = typeCollectionName;
    }
  }

  async getPosts(actions) {
    console.log('Getting posts...');

    for (let postType in this.restBases.posts) {
      postType = this.restBases.posts[postType]
      const postCollection = actions.getCollection(postType.collection);
      const { data } = await this.fetch(`/wp/v2/${postType.base}`);
      postType.data = data;
      const taxonomies = [];

      if (postType.hasOwnProperty('taxonomies')) {
        for (let taxonomy of postType.taxonomies) {
          taxonomy = this.restBases.taxonomies[taxonomy];
          postCollection.addReference(taxonomy.base, taxonomy.collection);
          taxonomies.push(taxonomy.base);
        }
      }

      for (const post of data) {
        const url = post.link.replace(this.options.baseUrl, '');

        if (this.isProd) {
          this.parseAcf(post.acf);
        }
        console.log(post);
        const postData = {
          id: post.id,
          date: post.date,
          title: post.title.rendered,
          url,
          // fields: {...post},
          acf: {
            ...post.acf
          },
          seo: post.yoast_head || false
        }

        for (const taxonomy of taxonomies) {
          postData[taxonomy] = post[taxonomy];
        }

        postCollection.addNode(postData);
      }
    }
  }

  async createPostPages(actions) {
    for (const postType of this.options.postTypes) {

      for (const post of this.restBases.posts[postType].data) {
        const path = post.link.replace(this.options.baseUrl, ''),
              template = this.convertTemplateName(postType);
        
        if (this.isProd) {
          this.parseAcf(post.acf);
        }

        actions.createPage({
          path,
          route: {
            meta: {
              routeId: template
            }
          },
          component: `./src/templates/single/${template}.vue`,
          context: {
            id: post.id,
            title: post.title.rendered,
            fields: {
              ...post.acf
            },
            seo: post.yoast_head || false
          }
        });
      }
    }
  }

  async createTaxonomyPages(actions) {
    for (let taxonomy in this.restBases.taxonomies) {
      taxonomy = this.restBases.taxonomies[taxonomy];
      for (const term of taxonomy.terms) {
        actions.createPage({
          path: `/${taxonomy.base}/${term.slug}`,
          route: {
            meta: {
              routeId: taxonomy.collection
            }
          },
          component: `./src/templates/${taxonomy.collection}.vue`,
          context: {
            ...term
          }
        });
      }
    }
  }

  async fetch (url, params = {}, fallbackData = []) {
    let res

    try {
      res = await this.client.request({ url, params })
    } catch ({ response, code, config }) {
      if (!response && code) {
        throw new Error(`${code} - ${config.url}`)
      }

      const { url } = response.config
      const { status } = response.data.data

      if ([401, 403].includes(status)) {
        console.warn(`Error: Status ${status} - ${url}`)
        return { ...response, data: fallbackData }
      } else {
        throw new Error(`${status} - ${url}`)
      }
    }

    return res
  }

  createTypeName(name) {
    return `${this.options.typeName}${upperFirst(camelCase(name))}`;
  }

  convertTemplateName(path) {
    const regex = /(?<=template-)(.*)(?=.php)/g,
          found = path.match(regex),
          nameSplit = found ? found[0].split('-') : path.split('-');

    return nameSplit.map(upperFirst).join('');
  }

  pascalCase(str) {
    return upperFirst(camelCase(str));
  }

  capitalizeString(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  parseAcf(obj) {
    if (typeof obj === 'array') {
      for (let k of obj) {
        this.parseAcfCheck(obj[k])
      }
    } else {
      for (let k in obj) {
        const returnString = this.parseAcfCheck(obj[k])
        if (typeof returnString === 'string') {
          obj[k] = returnString
        }
      }
    }
  }

  parseAcfCheck(item) {
    const type = typeof item;
    if (type === "object" || type === "array") {
      this.parseAcf(item)
    } else if (type === 'string') {
      if (item.includes('/app/uploads')) {
        const regex = new RegExp('(.*/app/uploads)(/\\d{4}/\\d{2}/)(.*)', 'g');
        const match = regex.exec(item)
        // console.log(match);
        
        const downloadUrl = this.options.baseUrl + '/app/uploads' + match[2] + match[3]
        console.log('Downloading from:', downloadUrl);
        mkdirSyncRecursive(path.resolve(this.options.localAssetUrl + match[2]))
        this.downloadImage(downloadUrl, this.options.localAssetUrl + match[2], match[3])

        return '/assets/img/uploads' + match[2] + match[3];
      }
    }
  }

  async downloadImage(url, destPath, fileName) {
    const imagePath = path.resolve(destPath, fileName);
    const encodedURI = encodeURI(url); 
    const requester = url.includes('https') ? https : http;

    try {
        if (fs.existsSync(imagePath)) return;
    } catch (err) {
        console.log(err);
    }

    const tmpPath = path.resolve(TMPDIR, `${++this.tmpCount}.tmp`);

    return new Promise(function(resolve, reject) {
        const file = fs.createWriteStream(tmpPath);
        requester
            .get(encodedURI, (response) => {
                response.pipe(file);
                file.on("finish", () => {
                    file.close();
                    fs.rename(tmpPath, imagePath, resolve);
                });
            })
            .on("error", (err) => {
                console.error(err.message);
                fs.unlinkSync(tmpPath); // Cleanup blank file
                reject(err);
            });
    });
  }
  // download(url, path, callback) {
  //   console.log('DOWNLOADING:', path);
  //   request.head(url, (err, res, body) => {
  //     request(url)
  //       .pipe(fs.createWriteStream(path))
  //       // .on('close', callback)
  //   })
  // }
}

module.exports = WPSource;