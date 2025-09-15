<template>
  <div
  @click="() => action()" class="flex-row items-center flex-nowrap gap-2 px-2 py-1 border-1 border-neutral-800 rounded-lg inline-flex hover:bg-neutral-800 hover:!border-neutral-700 hover:!text-primary-500 cursor-pointer hover:scale-105 transition-all mr-2">
    <div>
      <Icon :name="icon" class="size-4 text-primary-500" />
    </div>
    <div>
      {{$t(label)}}
    </div>
  </div>
</template>

<script setup lang="ts">

import Icon from '@/components/Icon.vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Action'
  },
  icon: {
    type: String,
    default: 'pencil'
  },
  action: {
    type: Function,
    default: () => {}
  }
});

</script>

<style scoped>

</style>