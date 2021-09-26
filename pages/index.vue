<template>
  <div class="flex min-h-screen bg-brand-50">
    <div
      class="w-1/3 max-w-[500px] bg-center bg-cover relative hidden md:block"
      :style="{
        backgroundImage: unsplashImage,
      }"
    >
      <div
        class="absolute inset-0 w-full h-full bg-opacity-75 bg-brand-900 backdrop-blur-sm"
      ></div>
    </div>
    <div class="container pt-8 pb-8 pl-4 pr-4 mx-auto md:pt-12 md:pl-8">
      <h1
        class="mb-8 text-6xl font-bold tracking-tighter md:text-8xl text-brand-900"
      >
        {{ appName }}
      </h1>

      <div class="flex flex-col justify-start space-y-4">
        <div v-if="links.length === 0" class="bg-gray-300 rounded-md animate-pulse h-11 w-80"></div>
        <div v-for="link in links" :key="link.slug">
          <a
            :href="`/api/go/${link.slug}`"
            class="flex items-center justify-between px-4 py-2 text-xl font-medium text-white rounded-md md:inline-flex bg-brand-700 hover:bg-brand-900 focus:bg-brand-900 gap-x-2 focus:ring-4 focus:ring-offset-2 focus:ring-brand-900 focus:ring-offset-brand-50 focus:outline-none"
          >
            <span>{{ link.title }}</span>
            <svg
              class="flex-shrink-0 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, env }) {
    const { data } = await app.$axios.get(`${env.workersEndpoint}/api/links`)
    
    return {
      links: data,
    }
  },
  computed: {
    appName() {
      return process.env.appName
    },
    unsplashImage() {
      return `url('https://source.unsplash.com/weekly/?${process.env.unsplashSearch}')`
    },
  },
}
</script>
