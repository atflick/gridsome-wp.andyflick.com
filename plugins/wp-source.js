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
      postTypes: options.postTypes || ['posts']
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

  async getPosts(actions) {
    for (const postType of this.options.postTypes) {
      const postCollection = actions.addCollection(postType);
      const { data } = await this.fetch(`/wp/v2/${postType}`);

      this.restBases.posts[postType] = {
        base: postType,
        data
      };

      for (const post of data) {
        // const path = post.link.replace(this.options.baseUrl, '');

        postCollection.addNode({
          id: post.id,
          date: post.date,
          title: post.title.rendered,
          // path
        });
      }
    }
  }

  createPostPages(actions) {
    for (const postType of this.options.postTypes) {
      console.log(postType);

      for (const post of this.restBases.posts[postType].data) {
        const path = post.link.replace(this.options.baseUrl, ''),
              template = this.convertTemplateName(postType);

        actions.createPage({
          path,
          component: `./src/templates/${template}.vue`,
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
        return accum + this.capitalizeString(next);
      });
    } else {
      return this.capitalizeString(nameSplit[0]);
    }
  }

  capitalizeString(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

module.exports = WPSource;