<template>
  <client-only>
    <div class="container lg:max-w-[1024px] mx-auto px-8 pt-8">
      <Breadcrumb group="Liens">{{ $t('stats') }}</Breadcrumb>

      <h1 v-if="link" class="mb-4 text-2xl font-bold text-brand-900">
        {{ link.title }}
      </h1>
      <form class="mb-4" @submit.prevent>
        <span class="block mb-2 text-sm font-bold text-left">{{ $t('period') }}</span>
        <v-date-picker
          v-model="range"
          mode="date"
          is-range
          is-required
          :update-on-input="false"
          @input="newRange($event)"
        >
          <template #default="{ inputValue, inputEvents, isDragging }">
            <div class="flex flex-col items-center justify-start sm:flex-row">
              <div class="relative">
                <svg
                  class="absolute w-4 h-full mx-2 text-gray-600 pointer-events-none "
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  type="text"
                  class="rounded-lg pl-7 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                />
              </div>
              <span class="flex-shrink-0 m-2">
                <svg
                  class="w-4 h-4 text-gray-600 rotate-90 stroke-current md:rotate-0"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <div class="relative">
                <svg
                  class="absolute w-4 h-full mx-2 text-gray-600 pointer-events-none "
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  type="text"
                  class="rounded-lg pl-7 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                />
              </div>
            </div>
          </template>
        </v-date-picker>
      </form>
      <div
        v-if="placeholder"
        class="inline-block w-56 h-24 bg-gray-300 rounded-lg animate-pulse"
      ></div>
      <div
        v-if="placeholder"
        class="inline-block h-24 bg-gray-300 rounded-lg w-72 animate-pulse"
      ></div>
      <div v-if="link && stats" class="block mb-4 space-x-4">
        <div class="inline-block p-4 bg-white rounded-lg shadow">
          <p class="text-2xl font-bold text-brand-900">{{ stats.length }}</p>
          <h2 class="text-lg font-medium">{{ $t('viewsCurrentPeriod') }}</h2>
        </div>
        <div
          v-if="count"
          class="inline-block p-4 mb-4 bg-white rounded-lg shadow"
        >
          <p class="text-2xl font-bold text-brand-900">{{ count }}</p>
          <h2 class="text-lg font-medium">{{ $t('viewsTotal') }}</h2>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-x-2 gap-y-8">
        <div class="w-5/6 md:w-full">
          <h3 class="text-lg font-medium text-center text-brand-900">
            {{ $t('referers') }}
          </h3>
          <DoughnutChart
            :chart-data="{
              labels: Object.keys(viewsByReferer),
              datasets: [
                {
                  label: $t('referers'),
                  data: Object.values(viewsByReferer),
                  backgroundColor: colors.brand,
                },
              ],
            }"
          />
        </div>
        <div class="w-5/6 md:w-full">
          <h3 class="text-lg font-medium text-center text-brand-900">
            {{ $t('browsers') }}
          </h3>
          <DoughnutChart
            :chart-data="{
              labels: Object.keys(viewsByBrowser),
              datasets: [
                {
                  label: $t('browsers'),
                  data: Object.values(viewsByBrowser),
                  backgroundColor: colors.gray,
                },
              ],
            }"
          />
        </div>
        <div class="w-5/6 md:w-full">
          <h3 class="text-lg font-medium text-center text-brand-900">
            {{ $t('devices') }}
          </h3>

          <DoughnutChart
            :chart-data="{
              labels: Object.keys(viewsByDevice),
              datasets: [
                {
                  label: $t('devices'),
                  data: Object.values(viewsByDevice),
                  backgroundColor: colors.brand,
                },
              ],
            }"
          />
        </div>
        <div class="relative w-5/6 md:w-full col-span-full">
          <LineChart
            class="h-72"
            :chart-data="{
              datasets: [
                {
                  label: $t('views'),
                  data: viewsByDateChart,
                  backgroundColor: colors.brand[0],
                  borderColor: colors.brand[0],
                  fill: false,
                },
              ],
            }"
            :options="{
              locale: $t('chartJsLocale'),
              spanGaps: 1000 * 60 * 60 * 24 * 30,
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                  display: true,
                  title: {
                    display: true,
                    text: $t('date'),
                  },
                  ticks: {
                    source: 'data',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: $t('views'),
                  },
                },
              },
            }"
          />
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { DoughnutChart, LineChart } from 'vue-chart-3'
import { theme } from '~tailwind.config'

const gray = Object.values(theme.colors.gray).reverse()
const brand = Object.values(theme.colors.brand).reverse()

gray.shift()
brand.shift()

export default {
  components: { DoughnutChart, LineChart },
  layout: 'admin',
  asyncData({ params }) {
    return {
      slug: params.slug,
    }
  },
  data: () => ({
    link: null,
    count: null,
    placeholder: true,
    viewsByReferer: {},
    viewsByBrowser: {},
    viewsByDevice: {},
    viewsByDate: {},
    stats: null,
    colors: {
      gray,
      brand,
    },
    range: {
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date(),
    },
  }),
  computed: {
    viewsByDateChart() {
      const dataset = Object.entries(this.viewsByDate).map(([date, count]) => {
        return {
          x: new Date(date).toISOString(),
          y: count,
        }
      })

      return dataset.sort((a, b) => new Date(b.x) - new Date(a.x))
    },
  },
  async mounted() {
    if (!this.$store.state.links.isLoaded) {
      await this.$store.dispatch('links/getAll').then(() => {})
    }

    this.link = this.$store.state.links.data.find(({ slug }) => {
      return slug === this.slug
    })

    this.getStats()

    const { data } = await this.$axios.get(`/links/${this.slug}/count`)
    this.count = data
  },
  methods: {
    newRange() {
      this.getStats()
    },
    async getStats() {
      const { data } = await this.$axios.get(`/links/${this.slug}/stats`, {
        params: {
          start: this.range.start,
          end: this.range.end,
        },
      })

      this.stats = data

      const viewsByReferer = {}
      const viewsByBrowser = {}
      const viewsByDevice = {}
      const viewsByDate = {}

      data.forEach(({ referer, browser, device, dateTime }) => {
        if (referer === '') referer = null

        const date = new Date(dateTime).toDateString()

        if (!(referer in viewsByReferer)) {
          viewsByReferer[referer] = 0
        }
        if (!(browser in viewsByBrowser)) {
          viewsByBrowser[browser] = 0
        }
        if (!(device in viewsByDevice)) {
          viewsByDevice[device] = 0
        }
        if (!(date in viewsByDate)) {
          viewsByDate[date] = 0
        }

        viewsByReferer[referer] += 1
        viewsByBrowser[browser] += 1
        viewsByDevice[device] += 1
        viewsByDate[date] += 1
      })

      this.viewsByReferer = viewsByReferer
      this.viewsByBrowser = viewsByBrowser
      this.viewsByDevice = viewsByDevice
      this.viewsByDate = viewsByDate

      this.placeholder = false
    },
  },
}
</script>
