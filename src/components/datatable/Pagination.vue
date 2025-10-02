<template>
  <div class="flex justify-center m-2">
    <!-- <MiniButton
      class="size-9 !m-1 bg-neutral-900"
      :class="{
        '!bg-neutral-800 text-neutral-400 pointer-events-none': !leftActive,
      }"
      @click="
        () => {
          if (leftActive) {
            pageNumber--;
          }
        }
      "
      ><Icon name="chevron-left" class="size-4" />
    </MiniButton> -->
    <MiniButton :disabled="props.page === 1" @click="emit('paginate', 1)" class="size-9 !m-1"><ChevronDoubleLeftIcon class="size-4" /></MiniButton>
    <MiniButton :disabled="props.page === 1" @click="emit('paginate', props.page - 1)" class="size-9 !m-1"><ChevronLeftIcon class="size-4" /></MiniButton>
    <MiniButton
      class="size-9 !m-1"
      v-for="button in pages"
      :class="{
        'bg-primary-600 border-primary-400 text-neutral-200':
         props.page === button,
        // 'bg-neutral-900 !border-neutral-800 text-neutral-400 pointer-events-none':
        //   button.page === null,
      }"
      @click="() => { emit('paginate', button) }"
      >{{ button }}</MiniButton
    >
    <MiniButton class="size-9 !m-1" :disabled="props.page === props.pages" @click="emit('paginate', props.page + 1)"><ChevronRightIcon /></MiniButton>
    <MiniButton class="size-9 !m-1" :disabled="props.page === props.pages" @click="emit('paginate', props.pages)"><ChevronDoubleRightIcon /></MiniButton>
    <!-- <MiniButton
      class="size-9 !m-1 bg-neutral-900"
      :class="{
        '!bg-neutral-800 text-neutral-400 pointer-events-none': !rightActive,
      }"
      @click="
        () => {
          if (rightActive) {
            pageNumber++;
          }
        }
      "
      ><Icon name="chevron-right" class="size-4"
    /></MiniButton> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import MiniButton from "../buttons/MiniButton.vue";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  pages: number
  page: number
  padding?: number
}>();

const emit = defineEmits<{
  (e: 'paginate', value: number): void
}>();

const padding = 3;

const pages = computed(() => {
  const pg = []
  const rightPadding = Math.min(padding, props.pages - props.page)
  const leftPadding = Math.min(padding, props.page - 1)
  const leftAdd = padding - rightPadding
  const rightAdd = padding - leftPadding
  for(let i = 1; i <= props.pages; i++) {
    console.log(i)
    if(i < props.page - (padding + leftAdd)) {
      continue;
    }
    if(i > props.page + (padding + rightAdd)) {
      continue;

    }
    pg.push(i)
  }
  return pg
})
</script>

<style scoped></style>