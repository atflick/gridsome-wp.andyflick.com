// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const wpUrl = process.env.WORDPRESS_URL;
const WPSource = require('./plugins/wp-source')
module.exports = function (api) {

  const WP = new WPSource(api, {
    baseUrl: wpUrl,
    postTypes: ['post', 'team'],
    menuIds: [2]
  });

}
