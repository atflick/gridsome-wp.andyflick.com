const axios = require('axios')
const { mapKeys, isPlainObject, trimEnd, trimStart, camelCase, upperFirst } = require('lodash')

class WPSource {
  constructor(api, options) {
    console.log('LOADING');
    options = options === undefined ? {} : options;

    this.options = {
      baseUrl: options.baseUrl || '',
      apiBase: options.apiBase || 'wp-json',
      perPage: options.perPage || 100,
      concurrent: options.concurrent || 10,
      typeName: options.typeName || 'WordPress',
      menuIds: options.menuIds || [],
      menuTypeName: options.menuTypeName || 'Menu',
      postTypes: options.postTypes || ['post']
    }

    this.routes = this.options.routes || {};

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

        actions.createPage({
          path,
          component: `./src/templates/${template}.vue`,
          context: {
            id: page.id,
            title: page.title.rendered,
            fields: {
              ...page.acf
            }
          }
        });
      }

      this.createPostPages(actions);

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

      const response = await this.fetch(`/wp/v2/${taxonomy.base}`)
      if (response.data.length) {
        const taxCollection = actions.getCollection(taxonomy.collection)
        for (const term of response.data) {
          taxCollection.addNode({
            id: term.id,
            title: term.name,
            slug: term.slug,
            path: `/${taxonomy}/${term.slug}`
          });
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
          console.log(taxonomy);

          postCollection.addReference(taxonomy.base, taxonomy.collection);
          taxonomies.push(taxonomy.base);
        }
      }

      for (const post of data) {
        // console.log(post);

        const url = post.link.replace(this.options.baseUrl, '');
        const postData = {
          id: post.id,
          date: post.date,
          title: post.title.rendered,
          url,
          acf: {
            ...post.acf
          }
        }

        for (const taxonomy of taxonomies) {
          postData[taxonomy] = post[taxonomy];
        }
        console.log(postData);

        postCollection.addNode(postData);
      }
    }
  }

  createPostPages(actions) {
    for (const postType of this.options.postTypes) {
      // console.log(postType);

      for (const post of this.restBases.posts[postType].data) {
        const path = post.link.replace(this.options.baseUrl, ''),
              template = this.convertTemplateName(postType);

        actions.createPage({
          path,
          component: `./src/templates/single/${template}.vue`,
          context: {
            id: post.id,
            title: post.title.rendered,
            fields: {
              ...post.acf
            }
          }
        });
      }

    }
  }

  // async getPostTypes(actions) {
  //   const { data } = await this.fetch(`/wp/v2/types`);
  //   const addCollection = actions.addCollection || actions.addContentType
  //   console.log(data);

  //   for (const type in data) {
  //     const options = data[type]

  //     this.restBases.posts[type] = trimStart(options.rest_base, '/')

  //     addCollection({
  //       typeName: this.createTypeName(type),
  //       route: this.routes[type]
  //     });
  //   }
  // };


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

    if (nameSplit.length > 1) {
      return nameSplit.reduce((accum, next) => {
        return accum + upperFirst(next);
      });
    } else {
      return upperFirst(nameSplit[0]);
    }
  }

  pascalCase(str) {
    return upperFirst(camelCase(str));
  }

  capitalizeString(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = WPSource;