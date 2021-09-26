<template>
  <div class="container lg:max-w-[1024px] mx-auto px-8 pt-8">
    <Breadcrumb group="Liens">{{ $t('createLink') }}</Breadcrumb>

    <ValidationObserver v-slot="{ invalid }">
      <form class="mb-4 space-y-4" @submit.prevent="submitForm">
        <validation-provider v-slot="{ errors }" rules="required" tag="div">
          <label for="title" class="block mb-1 text-sm font-medium">
            {{ $t('title') }}
          </label>
          <input
            id="title"
            v-model="title"
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
            v-model="url"
            type="text"
            placeholder="https://..."
            class="max-w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent w-96"
          />
          <div v-if="errors" class="h-4 text-sm text-red-700">
            {{ errors.join(', ') }}
          </div>
        </validation-provider>
        <validation-provider v-slot="{ errors }" rules="alpha_dash" tag="div">
          <label for="slug" class="block mb-1 text-sm font-medium">
            {{ $t('slug') }} <small>{{ $t('slugDescription') }}</small>
          </label>
          <div class="inline-flex items-center bg-gray-200 rounded-lg">
            <div class="px-2">{{ workersEndpoint }}/go/</div>
            <input
              id="slug"
              v-model="slug"
              type="text"
              class="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
            />
          </div>
          <div class="h-4 text-sm italic text-gray-500">{{ $t('slugBlank') }}</div>
          <div v-if="errors" class="h-4 text-sm text-red-700">
            {{ errors.join(', ') }}
          </div>
        </validation-provider>
        <label
          for="published"
          class="flex items-center pb-8 text-sm font-medium gap-x-2"
        >
          <input
            id="published"
            v-model="published"
            type="checkbox"
            class="rounded text-brand-500 focus:border-brand-500 focus:ring focus:ring-offset-0 focus:ring-brand-600"
          />
          {{ $t('showInList') }}
        </label>

        <PrimaryButton
          type="submit"
          :disabled="invalid || loading"
          :loading="loading"
          class="
            disabled:bg-gray-200
            disabled:text-gray-400
            disabled:cursor-not-allowed
            bg-brand-900
            text-white
            hover:bg-brand-800
            focus:bg-brand-800
            focus:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-brand-800
            focus:ring-offset-brand-50
            focus:ring-offset-2
            transition-colors
            px-4
            min-w-[72px]
            py-2
            rounded-md
          "
        >
          {{ $t('Create') }}
        </PrimaryButton>
      </form></ValidationObserver
    >
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    title: '',
    url: '',
    slug: '',
    published: false,
    loading: false,
  }),
  computed: {
    workersEndpoint() {
      return process.env.workersEndpoint
    },
  },
  methods: {
    submitForm() {
      this.loading = true

      this.$axios
        .post('/links/', {
          title: this.title,
          destination: this.url,
          slug: this.slug,
          published: this.published,
        })
        .then(({ data }) => {
          this.$store.commit('links/add', data)
          this.$router.push('/dashboard')
        })
    },
  },
}
</script>
