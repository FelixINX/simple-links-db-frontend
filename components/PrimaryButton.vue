<template>
  <button
    :disabled="disabled"
    :type="type"
    class="
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
      flex gap-x-2
      items-center
      relative
      overflow-hidden
    "
  >
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center w-full h-full bg-brand-900"
    >
      <svg
        class="w-5 h-5 text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <slot :class="{ 'opacity-0': loading }" />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: null,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
