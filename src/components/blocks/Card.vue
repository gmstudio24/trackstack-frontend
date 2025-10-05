<template>
  <div
    class="p-4 border-1 border-neutral-900 my-4 rounded-lg focus-within:border-primary-900 transition-all"
  >
    <div v-if="props.title" class="mt-[-30px]">
      <h2
        class="px-2 bg-neutral-950 text-xl text-neutral-100 inline-block"
        :class="{'cursor-pointer': expandable}"
        @click="expandToggle"
      >
        {{ $t(props.title) }} <component v-if="expandable" class="size-4 inline -mt-1 text-neutral-300" :class="{'text-primary-500': expand}" :is="expand ? ChevronUpIcon :ChevronDownIcon" />
      </h2>
    </div>
    <Transition name="fadescale"
      ><div v-if="expand">
        <slot /></div
    ></Transition>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import {ref, Transition} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  expandable: {
    type: Boolean,
    default: false,
  }
});


const expandToggle = () => {
  if (!props.expandable) return;
  expand.value = !expand.value;
};

const expand = ref(true);
</script>

<style scoped></style>
