<template>
  <component :is="getIcon(props.name)" :class="props.class" />
</template>

<script setup lang="ts">
  import { useIcon } from '@/composables/useIcon';
import { onMounted, ref } from 'vue';
  const { getIcon } = useIcon();
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    class: {
      type: String,
      default: ''
    },
  })

</script>

<style scoped>

</style>