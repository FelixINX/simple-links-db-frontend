<template>
  <div class="container lg:max-w-[1024px] mx-auto px-8 pt-8">
    <Breadcrumb group="Liens">{{ $t('editLink') }}</Breadcrumb>

    <h1 v-if="link.slug" class="mb-4 text-2xl font-bold text-brand-900">
      {{ link.title }}
    </h1>
    <ValidationObserver v-if="link.slug" v-slot="{ invalid }">
      <form class="mb-4 space-y-4" @submit.prevent="submitForm">
        <validation-provider v-slot="{ errors }" rules="required" tag="div">
          <label for="title" class="block mb-1 text-sm font-medium">
            {{ $t('title') }}
          </label>
          <input
            id="title"
            v-model="link.title"
            type="text"
            placeholder=""
            class="max-w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent w-96"
          />
          <div v-if="errors" class="h-4 text-sm text-red-700">
            {{ errors.join(', ') }}
          </div>
        </validation-provider>
        <validation-provider v-slot="{ errors }" rules="required|url" tag="div">
          <label for="destination" class="block mb-1 text-sm font-medium">
            {{ $t('url') }}
          </label>
          <input
            id="destination"
            v-model="link.destination"
            type="text"
            placeholder="https://..."
            class="max-w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent w-96"
          />
          <div v-if="errors" class="h-4 text-sm text-red-700">
            {{ errors.join(', ') }}
          </div>
        </validation-provider>
        <div>
          <label for="slug" class="block mb-1 text-sm font-medium">
            {{ $t('slug') }} <small>{{ $t('slugDesc') }}</small>
          </label>
          <div class="inline-flex items-center bg-gray-200 rounded-lg">
            <div class="px-2">{{ workersEndpoint }}/go/</div>
            <input
              id="slug"
              v-model="link.slug"
              type="text"
              class="w-full bg-gray-100 rounded-lg cursor-not-allowed"
              disabled
            />
          </div>
          <div class="h-4 text-sm italic text-gray-500">
            {{ $t('slugCannotEdit') }}
          </div>
        </div>
        <label
          for="published"
          class="flex items-center pb-8 text-sm font-medium gap-x-2"
        >
          <input
            id="published"
            v-model="link.published"
            type="checkbox"
            class="rounded text-brand-500 focus:border-brand-500 focus:ring focus:ring-offset-0 focus:ring-brand-600 focus:ring-opacity-50"
          />
          {{ $t('showInList') }}
        </label>

        <div class="flex gap-x-4">
          <PrimaryButton
            type="submit"
            :loading="loading"
            :disabled="invalid || loading"
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
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {{ $t('Save') }}
          </PrimaryButton>

          <PrimaryButton
            class="bg-red-900 hover:bg-red-700 focus:bg-red-700 focus:ring-red-700"
            :loading="deleteLoading"
            :disabled="deleteLoading"
            @click="deleteLink"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            {{ $t('delete') }}
          </PrimaryButton>
          <NuxtLink
            :to="`/dashboard/links/${slug}/stats`"
            class="
              bg-gray-900
              text-white
              hover:bg-gray-700
              focus:bg-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-gray-700
              focus:ring-offset-brand-50
              focus:ring-offset-2
              transition-colors
              px-4
              min-w-[72px]
              py-2
              rounded-md
              flex
              items-center
              gap-x-1
            "
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            {{ $t('seeStats') }}
          </NuxtLink>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  layout: 'admin',
  asyncData({ params }) {
    return {
      slug: params.slug,
    }
  },
  data: () => ({
    link: {},
    loading: false,
    deleteLoading: false,
  }),
  async mounted() {
    if (!this.$store.state.links.isLoaded) {
      await this.$store.dispatch('links/getAll')
    }

    const link = this.$store.getters['links/getBySlug'](this.slug)

    if (!link) {
      return this.$router.push('/dashboard')
    }

    const properties = ['slug', 'title', 'destination', 'published']
    properties.forEach((property) => {
      Vue.set(this.link, property, link[property])
    })
  },
  methods: {
    deleteLink() {
      this.deleteLoading = true
      this.$axios
        .delete(`/links/${this.slug}`)
        .then(() => {
          this.$store.commit('links/remove', this.slug)
          this.$router.push('/dashboard')
          this.deleteLoading = false
        })
    },
    submitForm() {
      this.loading = true
      this.$axios
        .put(`/links/${this.slug}`, this.link)
        .then(({ data }) => {
          this.$store.commit('links/remove', this.slug)
          this.$store.commit('links/add', data)
          this.$router.push('/dashboard')
          this.loading = false
        })
    },
  },
}
</script>
