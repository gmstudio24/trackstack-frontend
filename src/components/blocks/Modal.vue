<template>
  <div
    class="fixed z-10 left-0 top-0 w-screen h-screen bg-neutral-900/50 flex items-center justify-center"
  >
    <div class="bg-neutral-900 rounded-lg p-4 border-1 border-neutral-800">
      <div
        class="flex flex-row items-center pb-2 mb-2 border-b-1 border-neutral-800"
      >
        <div class="flex-1 text-lg font-bold">{{ title }}</div>
        <div
          class="p-1 hover:bg-neutral-800 ml-6 rounded-md cursor-pointer"
          @click="close"
        >
          <XMarkIcon class="size-6" />
        </div>
      </div>
      <div><slot></slot></div>
      <div class="flex items-center justify-center">
        <Button
          v-for="(value, key) in props.buttons"
          :key="key"
          class="m-1"
          :primary="value.primary ?? false"
          @click="() => {
            emits('action', {name: key})
          }"
          >{{ value.label }}</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {XMarkIcon} from "@heroicons/vue/24/outline";
import Button from "../buttons/Button.vue";

const props = defineProps<{
  title: string;
  buttons?: Record<string, {label: string; primary?: boolean}>;
}>();

const emits = defineEmits<{
  (event: "action", value: {
    name: string;
    value?: any;
  }): void;
  (event: "close"): void;
}>();
const close = () => {
  emits("close");
};
</script>

<style scoped></style>
