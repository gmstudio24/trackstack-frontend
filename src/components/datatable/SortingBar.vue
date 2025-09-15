<template>
  <div class="flex flex-row items-center">
    <div class="flex-shrink basis-[200px]" v-if="(props.columns?.length ?? 0) > 0">
      <SelectInput
        disabled
        label="sorting.sortBy"
        :options="props.columns?.map((column) => ({
          value: column.key,
          label: column.label,
        })) ?? []" />
    </div>
    <div class="ml-4" v-if="(props.filters?.length ?? 0) > 0">
      <InputWrapper label="sorting.filters">
        <SortingBubble disabled class="my-2" v-for="filter in props.filters" :value="filter.key" :label="filter.label" @toggle="filter.toggle" />
      </InputWrapper>
    </div>
    <div class="flex-1 text-right mr-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputWrapper from '../input/InputWrapper.vue';
import SelectInput from '../input/SelectInput.vue';
import SortingBubble from './SortingBubble.vue';

  const props = defineProps({
    columns: {
      type: Array as () => Array<{
        key: string;
        label: string;
        primary?: boolean;
        meta?: boolean;
      }>,
      required: false
    },
    filters: {
      type: Array as () => Array<{
        key: string;
        label: string;
        toggle: (key: string) => any;
      }>,
      required: false
    },
  })
</script>

<style scoped>

</style>