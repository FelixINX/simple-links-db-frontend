<template>
  <div class="flex flex-col min-h-screen bg-brand-50">
    <div
      class="flex items-center justify-between flex-shrink-0 h-16 px-4 bg-brand-700 gap-x-4"
    >
      <NuxtLink
        to="/dashboard"
        class="text-2xl font-bold tracking-tighter text-white"
      >
        {{ appName }}
      </NuxtLink>
      <button
        v-if="isLoggedIn"
        class="flex items-center justify-center w-8 h-8 p-1 transition-opacity rounded-full bg-brand-900"
        title="Se déconnecter"
        @click="logout"
      >
        <svg
          class="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
      </button>
    </div>

    <Nuxt v-if="isLoggedIn" class="flex-grow mb-8" />
    <div
      v-else
      class="container lg:max-w-[1024px] mx-auto px-8 pt-8 flex-grow mb-8"
    >
      <div
        class="block w-3/4 h-8 max-w-md bg-gray-300 rounded-lg animate-pulse"
      ></div>
    </div>
  </div>
</template>

<script>
import '@fontsource/inter'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

export default {
  computed: {
    appName() {
      return process.env.appName
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
  },
  mounted() {
    if (!this.isLoggedIn) this.$router.push('/login')
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  },
}
</script>
