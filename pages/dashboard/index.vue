<template>
  <div class="container lg:max-w-[1024px] mx-auto px-8 pt-8">
    <section class="flex-grow space-y-4">
      <div class="flex flex-wrap justify-between">
        <h2 class="text-2xl font-bold text-brand-900">{{ $t('allLinks') }}</h2>

        <NuxtLink to="/dashboard/links/create">
          <PrimaryButton>
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            {{ $t('newLink') }}
          </PrimaryButton>
        </NuxtLink>
      </div>
      <div
        v-if="dataLoaded && links.length === 0"
        class="flex items-center justify-between px-4 py-2 mb-8 rounded-lg  md:px-8 md:py-4 bg-gradient-to-br from-green-100 to-green-200"
      >
        <div>
          <h2 class="text-lg font-bold text-gray-800 md:text-2xl">
            {{ $t('noLink') }}
          </h2>
          <p class="font-medium text-gray-700 md:text-lg">
            {{ $t('startCreatingLink') }}
          </p>
        </div>
        <NuxtLink
          to="/dashboard/links/create"
          tag="button"
          class="
            bg-gray-900
            text-white
            font-medium
            hover:bg-gray-700
            focus:bg-gray-700 focus:text-white focus:outline-none
            hover:ring-2
            hover:ring-gray-700
            hover:ring-offset-2
            hover:ring-offset-gray-300
            focus:ring-2
            focus:ring-gray-700
            focus:ring-offset-2
            focus:ring-offset-gray-300
            transition-colors
            px-3
            md:px-6
            min-w-[72px]
            md:min-w-[144px]
            py-2
            md:py-4
            rounded-md
            flex
            items-center
            justify-center
            md:text-lg
            gap-x-2
          "
        >
          <span>{{ $t('letsGo') }}</span>
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </NuxtLink>
      </div>
      <ul v-if="dataLoaded" class="space-y-4">
        <li
          v-for="link in links"
          :key="link.id"
          class="flex items-center w-full overflow-hidden bg-white rounded-lg shadow "
        >
          <div
            class="items-center self-stretch justify-center flex-shrink-0 hidden w-20 bg-gray-700  sm:flex"
          >
            <qrcode-vue
              :id="`qr-${link.slug}`"
              :value="`${workersEndpointGo}/${link.slug}`"
              :size="56"
              render-as="svg"
              foreground="#374151"
            />
          </div>
          <div class="p-4 space-y-1">
            <h2 class="text-xl font-medium">
              {{ link.title }}
              <svg
                v-if="!link.published"
                class="inline-block w-6 h-6 ml-2 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                ></path>
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                ></path>
              </svg>
            </h2>
            <div class="items-center hidden md:flex gap-x-1">
              <a
                :href="`${workersEndpointGo}/${link.slug}`"
                target="_blank"
                class="flex items-center flex-shrink-0 gap-x-1 group"
              >
                <p
                  class="text-gray-400 transition-colors border-b border-transparent  group-hover:text-brand-900 group-focus:text-brand-900 group-hover:border-brand-900"
                >
                  {{ link.slug }}
                </p>
              </a>
              <svg
                class="flex-shrink-0 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
              <a
                :href="link.destination"
                target="_blank"
                class="flex items-center gap-x-1 group"
              >
                <p
                  class="overflow-hidden text-gray-400 transition-colors border-b border-transparent  group-hover:text-brand-900 group-focus:text-brand-900 group-hover:border-brand-900"
                >
                  {{ link.destination | baseUrl }}
                </p>
                <svg
                  class="flex-shrink-0 w-4 h-4 transition-opacity opacity-0  text-brand-900 group-hover:opacity-100 group-focus:opacity-100"
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
          <div class="flex-grow"></div>
          <div class="flex-shrink-0 mr-4 space-x-2">
            <button
              class="hidden md:inline-block group"
              :title="$t('downloadSvg')"
              @click="downloadSvg(link)"
            >
              <svg
                class="w-6 h-6 transition-colors  text-brand-500 group-focus:text-brand-900 group-hover:text-brand-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
            </button>
            <NuxtLink
              :title="$t('seeStats')"
              :to="`/dashboard/links/${link.slug}/stats`"
              tag="button"
              class="group"
            >
              <svg
                class="w-6 h-6 transition-colors  text-brand-500 group-focus:text-brand-900 group-hover:text-brand-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </NuxtLink>
            <NuxtLink
              :title="$t('editLink')"
              :to="`/dashboard/links/${link.slug}`"
              tag="button"
              class="group"
            >
              <svg
                class="w-6 h-6 transition-colors  text-brand-500 group-focus:text-brand-900 group-hover:text-brand-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </NuxtLink>
          </div>
        </li>
      </ul>
      <div v-else class="block bg-gray-300 rounded-lg animate-pulse h-28"></div>
    </section>
    <div ref="downloadSpace" class="hidden"></div>
  </div>
</template>

<script>
import Url from 'url-parse'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue,
  },
  filters: {
    baseUrl(fullUrl) {
      const url = new Url(fullUrl)

      return `${url.host}${url.pathname}`
    },
  },
  layout: 'admin',
  computed: {
    links() {
      return this.$store.state.links.data
    },
    dataLoaded() {
      return this.$store.state.links.isLoaded
    },
    workersEndpointGo() {
      return `${process.env.workersEndpoint}/go`
    },
    user() {
      // TODO
      return {}
    },
  },
  mounted() {
    if (!this.dataLoaded) {
      this.$store.dispatch('links/getAll')
    }
  },
  methods: {
    downloadSvg(link) {
      const qr = document.getElementById(`qr-${link.slug}`)
      const downloadLink = document.createElement('a')

      downloadLink.href = window.URL.createObjectURL(new Blob([qr.innerHTML]))
      downloadLink.download = `qr-${link.slug}.svg`

      this.$refs.downloadSpace.appendChild(downloadLink)
      downloadLink.click()
      this.$refs.downloadSpace.removeChild(downloadLink)
    },
  },
}
</script>
