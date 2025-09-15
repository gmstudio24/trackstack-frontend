<template>
  <div
    @click="toggle"
    class="transition-all mx-1 px-4 py-1 text-sm rounded-full bg-neutral-900 border-neutral-800 border-1 inline-block text-neutral-400 cursor-pointer select-none"
    role="button"
    @keydown.enter="toggle"
    tabindex="0"
    :aria-pressed="enabled"
    :class="{
      'bg-primary-600 !text-neutral-100 !border-primary-500': enabled,
      '!text-neutral-500 !border-neutral-800 pointer-events-none': disabled,

    }"
  >
    {{ $t(props.label) }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["toggle"]);

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const enabled = ref(false);

const toggle = () => {
  enabled.value = !enabled.value;
  emit("toggle", props.value);
};
</script>

<style scoped></style>
