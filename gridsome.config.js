// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [

        // importing global scss
        path.resolve(__dirname, './src/assets/css/vendor/_vendor.scss'),
        path.resolve(__dirname, './src/assets/css/helpers/mixins/**/*.scss'),
        path.resolve(__dirname, './src/assets/css/helpers/functions/**/*.scss'),
        path.resolve(__dirname, './src/assets/css/_colors.scss'),
        path.resolve(__dirname, './src/assets/css/_settings.scss'),
        path.resolve(__dirname, './src/assets/css/_transitions.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Andy Flick',
  plugins: [],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })

    config.module
      .rule('glob')
        .test(/\.scss/)
        .use('import-glob-loader')
          .loader('import-glob-loader')
          .end()

	}
}
