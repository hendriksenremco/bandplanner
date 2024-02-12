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
  }
})
