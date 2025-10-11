<template>
  <div @click="close" class="p-4 px-6 rounded-xl border-1 backdrop-blur cursor-pointer transition mt-2" :class="colorScheme[props.type]">
    <h4 class="mb-1">{{ $t(props.title) }}</h4>
    <p><slot></slot></p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';


const props = defineProps<{
  title: string
  type: 'success' | 'error' | 'warning' | 'info'
  timeout: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>();

const colorScheme = {
  success: 'bg-green-600/20 text-green-200 border-green-800 hover:bg-green-600/30',
  error: 'bg-red-600/20 text-red-200 border-red-800 hover:bg-red-600/30 ',
  warning: 'bg-yellow-600/20 text-yellow-200 border-yellow-800 hover:bg-yellow-600/30',
  info: 'bg-blue-600/20 text-blue-200 border-blue-800 hover:bg-blue-600/30'
}

let timeout: number|null = null

const close = () => {
  emit('close')
}

onMounted(() => {
  timeout = setTimeout(() => {
    close();
  }, props.timeout * 1000)
})

onUnmounted(() => {
  if(timeout) clearTimeout(timeout);
})


</script>

<style scoped>

</style>