<template>
  <div class="flex justify-center m-2">
    <MiniButton
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
    </MiniButton>
    <MiniButton
      class="size-9 !m-1"
      v-for="button in buttons"
      :class="{
        'bg-primary-600 border-primary-400 text-neutral-200':
          pageNumber === button.page,
        'bg-neutral-900 !border-neutral-800 text-neutral-400 pointer-events-none':
          button.page === null,
      }"
      @click="button.action"
      >{{ button.label }}</MiniButton
    >
    <MiniButton
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
    /></MiniButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Icon from "../Icon.vue";
import IconButton from "../buttons/IconButton.vue";
import MiniButton from "../buttons/MiniButton.vue";
import SelectInput from "../input/SelectInput.vue";
import InputWrapper from "../input/InputWrapper.vue";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Array as () => number[],
    default: () => [50, 100],
    required: false,
  },
});

const leftActive = computed(() => pageNumber.value > 1);

const rightActive = computed(() => pageNumber.value < pages.value.length);

const pageNumber = ref(1);

const perPage = ref(50);

const pages = computed(() => {
  const totalPages = Math.ceil(props.total / perPage.value);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
});

const buttons = computed(() => {
  let pagesResult = [];

  const distance = 3;

  const rightTrim = Math.max(4 - pages.value.length + pageNumber.value, 0);
  const leftTrim = Math.max(5 - pageNumber.value, 0);

  if (leftTrim < distance - 1) {
    pagesResult.push({
      label: "1",
      page: 1,
      action: () => {
        pageNumber.value = 1;
      },
    });
  }
  if (leftTrim < distance - 2) {
    pagesResult.push({
      label: "...",
      page: null,
      action: () => {},
    });
  }
  const leftSide = pages.value.slice(
    Math.max(0, pageNumber.value - distance - rightTrim),
    pageNumber.value - 1
  );
  const rightSide = pages.value.slice(
    pageNumber.value,
    Math.min(pages.value.length, pageNumber.value + distance - 1 + leftTrim)
  );
  pagesResult.push(
    ...leftSide.map((page) => ({
      label: page.toString(),
      page,
      action: () => (pageNumber.value = page),
    }))
  );
  pagesResult.push({
    label: pageNumber.value.toString(),
    page: pageNumber.value,
    action: () => {},
  });
  pagesResult.push(
    ...rightSide.map((page) => ({
      label: page.toString(),
      page,
      action: () => (pageNumber.value = page),
    }))
  );
  if (rightTrim < distance - 2) {
    pagesResult.push({
      label: "...",
      page: null,
      action: () => {},
    });
  }
  if (rightTrim < distance - 1) {
    pagesResult.push({
      label: pages.value.length.toString(),
      page: pages.value.length,
      action: () => {
        pageNumber.value = pages.value.length;
      },
    });
  }

  return pagesResult;
});
</script>

<style scoped></style>
