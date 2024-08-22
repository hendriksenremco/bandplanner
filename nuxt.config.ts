// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,

  components: [
    { path: '~/components' },
    { path: '~/components/atoms' },
    { path: '~/components/molecules' },
    { path: '~/components/organisms' }
  ],

  runtimeConfig: {
    public: {
      firebaseApiKey: ''
    }
  },

  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }
      })
    ]
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-29',
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'Bandplanner',
      short_name: 'Bandplanner',
      theme_color: '#1a1918',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'minimal-ui'],
      description: 'Bandplanner app for musicians, managers and more.'
    }
  }
})
