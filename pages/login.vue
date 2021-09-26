<template>
  <div class="flex w-full min-h-screen">
    <div
      class="relative flex items-center justify-center flex-grow bg-center bg-no-repeat bg-cover "
      :style="{
        backgroundImage: `url('https://source.unsplash.com/featured/?${unsplashSearch}')`,
      }"
    >
      <div
        class="absolute inset-0 z-10 w-full h-full bg-opacity-50 bg-brand-900"
      ></div>
      <h1
        class="z-20 font-bold tracking-tighter text-transparent text-9xl bg-gradient-to-r from-brand-200 to-brand-300 bg-clip-text"
      >
        {{ appName }}
      </h1>
      <div
        class="absolute z-20 flex items-center px-2 py-1 bg-white bg-opacity-50 rounded-full bottom-2 left-2 gap-x-1"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        <div class="text-xs">
          {{ $t('picturesFrom') }}
          <a
            :href="`https://unsplash.com${
              unsplashSearch &&
              '/s/photos/' + encodeURIComponent(unsplashSearch)
            }`"
            class="font-medium underline"
            >Unsplash</a
          >
        </div>
      </div>
    </div>
    <div
      class="
        bg-white
        min-w-[400px]
        md:max-w-[400px]
        flex flex-col
        justify-center
        gap-y-1
        px-4
        relative
        overflow-hidden
      "
    >
      <h2 class="text-xl font-medium text-brand-900">{{ $t('signIn') }}</h2>
      <form @submit.prevent="login">
        <input
        id="username"
          v-model="username"
          required="required"
          type="text"
          :placeholder="$t('username')"
          :disabled="loading"
          class="block rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
        <input
        id="password"
          v-model="password"
          required="required"
          type="password"
          :placeholder="$t('password')"
          :disabled="loading"
          class="block max-w-full mt-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
        <PrimaryButton :loading="loading" :disabled="loading" type="submit">{{
          $t('logIn')
        }}</PrimaryButton>
      </form>

      <p v-if="error" class="text-sm font-medium text-red-500">
        {{ $t('errorAuth') }}
      </p>
      <div
        class="
          absolute
          w-[200%]
          h-64
          -right-12
          -bottom-24
          -rotate-12
          bg-brand-100 bg-opacity-75
        "
      ></div>
      <div
        class="absolute w-[200%] h-32 -right-12 -bottom-2 rotate-6 bg-brand-200"
      ></div>
    </div>
  </div>
</template>

<script>
import '@fontsource/inter'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import PrimaryButton from '../components/PrimaryButton.vue'

export default {
  components: { PrimaryButton },
  data: () => ({
    username: '',
    password: '',
    error: false,
    loading: false,
  }),
  computed: {
    appName() {
      return process.env.appName
    },
    unsplashSearch() {
      return process.env.unsplashSearch
    },
  },
  methods: {
    login() {
      this.loading = true
      this.error = false

      this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password,
      })

      this.$axios
        .post('/auth')
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit('auth/setState', true)
            this.$router.push('/dashboard')
          }
          this.loading = false
        })
        .catch(() => {
          this.$store.dispatch('auth/logout')
          this.username = ''
          this.password = ''
          this.error = true
          this.loading = false
        })
    },
  },
}
</script>
