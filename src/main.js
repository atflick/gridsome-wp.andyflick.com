// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import { upperFirst, camelCase } from 'lodash'
import '~/assets/css/style.scss'

import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue|js)$/
)

export default function (Vue, { appOptions, router, head, isClient }) {

  appOptions.render = h => h(DefaultLayout, { attrs: { id: 'app' } })

  // Set default layout as a global component
  // Vue.component('Layout', DefaultLayout)
  requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName)

    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Gets the file name regardless of folder depth
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )

    // Register component globally
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
    )
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.css'
  })

  head.script.push({
    src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js',
    body: true
  })

  head.script.push({
    src: 'https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.min.js',
    body: true
  })
}
