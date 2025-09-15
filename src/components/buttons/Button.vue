<template>
  <component
    :is="props.to ? RouterLink : 'button'"
    class="transition-all my-2 px-4 py-2 border-primary-800 border-1 rounded-lg text-white hover:scale-102 shadow-primary-900 hover:text-primary-500 hover:bg-neutral-900 cursor-pointer hover:!text-primary-500 items-center gap-2 inline-flex justify-center"
    :to="props.to"
    @click="props.action"
    :class="{
      'w-full': props.fullWidth,
      'bg-primary-500 border-primary-400 !text-neutral-100': props.primary,
      '!text-neutral-300': !props.primary,
      '!border-neutral-800 !bg-neutral-900 !text-neutral-700 pointer-events-none': props.disabled,
    }"
  >
    <div v-if="icon" :class="{ '!text-primary-500': !props.primary }">
      <Icon :name="icon" class="size-4" />
    </div>
    <div>
      <slot>Button</slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import Icon from "../Icon.vue";
const props = defineProps({
  action: {
    type: Function,
    default: () => {},
  },
  to: {
    type: String,
    default: "",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped></style>
