// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const wpUrl = process.env.WORDPRESS_URL;
const WPSource = require('./plugins/wp-source')
const path = require('path')
const fse = require('fs-extra')
module.exports = function (api) {

  const WP = new WPSource(api, {
    baseUrl: wpUrl,
    apiBase: process.env.API_BASE,
    postTypes: ['post'],
    menuIds: [2]
  });

  api.afterBuild(() => {
    const srcDir = path.resolve('.cache/assets/images');
    const destDir = path.resolve('dist/assets/img/uploads');
                              
    // To copy a folder or file  
    fse.moveSync(srcDir, destDir, function (err) {
      if (err) {
        console.error(err);      
      } else {
        console.log("Copied all WP Images");
      }
    });
  })

}
