<template>
  <div
    class="
      absolute
      inset-0
      flex
      items-center
      justify-center
      w-full
      h-full
      min-w-full min-h-screen
      bg-black bg-opacity-25
      backdrop-blur-[2px]
    "
  >
    <div class="px-8 py-4 space-y-4 bg-white rounded-lg shadow-xl lg:max-w-lg">
      <slot name="title">
        <div class="flex items-center justify-between mb-2">
          <p class="text-2xl font-bold text-brand-900">
            {{ title }}
          </p>
          <button v-if="canClose">
            <svg
              class="w-6 h-6 text-brand-900 transition-colors hover:text-red-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </slot>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: null,
        },
        canClose: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
}
</script>
