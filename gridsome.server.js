// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios');
const wpUrl = process.env.WORDPRESS_URL;

module.exports = function (api) {
  api.loadSource(async store => {
    const menuIds = [2];
    const menuContentType = store.addCollection('Menu');

    for (const id of menuIds) {
      const menu = await axios.get(`${wpUrl}/wp-json/wp-api-menus/v2/menus/${id}`);

      const menuItems = menu.data.items.map((item) => {

        const itemObject = {
          title: item.title,
          url: item.url.replace(wpUrl, ''),
          sasd: wpUrl,
          children: []
        }

        if (item.children) {
          itemObject['children'] = item.children.map((child) => {
            return {
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

  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
