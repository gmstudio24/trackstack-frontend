<template>
  <div class="flex flex-row items-center gap-2">
    <div class="flex-shrink basis-[200px]" v-if="(props.columns?.length ?? 0) > 0">
      <SelectInput
        label="sorting.sortBy"
        :options="props.columns?.map((column) => ({
          value: column.key,
          label: column.label,
        })) ?? []"
        v-model="sortBy"
        />
    </div>
    <SelectInput
      label="sorting.limit"
      :options="props.limits?.map((limit) => ({
        value: limit,
        label: limit.toString(),
      })) ?? []"
      v-model="limit"
      />
    <div class="flex-1 text-right mr-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import InputWrapper from '../input/InputWrapper.vue';
import SelectInput from '../input/SelectInput.vue';
import SortingBubble from './SortingBubble.vue';

const sortBy = ref('')
const limit = ref(50)

watch(sortBy, (newValue) => {
  if(sortBy.value !== '') {
    emit('update:sortBy', newValue)
  }
})

watch(limit, (newValue) => {
  emit('update:limit', newValue)
})

const emit = defineEmits<{
  (e: 'update:sortBy', value: string): void,
  (e: 'update:limit', value: number): void,
}>();

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
    limits: {
      type: Array as () => Array<number>,
      default: () => [2, 4, 25, 50, 100],
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