export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'LinksDB',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/chartjs.client.js',
    '~/plugins/vcalendar.client.js',
    '~/plugins/vee-validate.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      `${process.env.WORKERS_ENDPOINT}/api` || 'http://127.0.0.1:8787/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vee-validate',
      '@fontsource/inter',
      'chart.js',
      'chartjs-adapter-luxon',
    ],
  },

  generate: {
    exclude: [/^\/dashboard/, /^\/login/],
    fallback: true,
  },

  env: {
    appName: process.env.APP_NAME || 'Links DB',
    googleOauthId: process.env.GOOGLE_OAUTH_ID,
    unsplashSearch: process.env.UNSPLASH_SEARCH,
    workersEndpoint: process.env.WORKERS_ENDPOINT,
  },

  i18n: {
    locales: [{ code: 'en', iso: 'en-US', file: 'en.js' }],
    defaultLocale: 'en',
    lazy: true,
    langDir: '~/i18n',
    detectBrowserLanguage: {
      fallbackLocale: 'en',
      useCookie: false,
    },
  },

  tailwindcss: {
    exposeConfig: true,
  },
}
