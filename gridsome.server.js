// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios');
const wpUrl = process.env.WORDPRESS_URL;

module.exports = function (api) {
  api.loadSource(async store => {

    /**
     * Menus
     */
    const menuIds = [2];
    const menuContentType = store.addCollection('Menu');

    for (const id of menuIds) {
      const menu = await axios.get(`${wpUrl}/wp-json/wp-api-menus/v2/menus/${id}`);

      const menuItems = menu.data.items.map((item) => {

        const itemObject = {
          id: item.id,
          title: item.title,
          url: item.url.replace(wpUrl, ''),
          children: []
        }

        if (item.children) {
          itemObject['children'] = item.children.map((child) => {
            return {
              id: child.id,
              title: child.title,
              url: child.url.replace(wpUrl, '')
            }
          });
        }

        return itemObject;
      });

      menuContentType.addNode({
        id: menu.data.ID,
        name: menu.data.name,
        items: [
          ...menuItems
        ]
      })
    }

    /**
     * Pages
     */
    // const pageContentType = store.addCollection('Page');


  });

  api.createPages(async store => {
    const pages = await axios.get(`${wpUrl}/wp-json/wp/v2/pages`);

    for (page of pages.data) {
      const path = page.link.replace(wpUrl, ''),
            template = page.template === '' ? 'Default' :  convertTemplate(page.template);

      store.createPage({
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
  });

  function convertTemplate(path) {
    const regex = /(?<=template-)(.*)(?=.php)/g,
          found = path.match(regex),
          nameSplit = found[0].split('-');
    if (nameSplit.length > 1) {
      return nameSplit.reduce((accum, next) => {
        return accum + capitalizeString(next);
      });
    } else {
      return capitalizeString(nameSplit[0]);
    }
  }

  function capitalizeString(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
