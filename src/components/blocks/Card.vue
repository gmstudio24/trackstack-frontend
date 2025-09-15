<template>
  <div class="p-4 border-1 border-neutral-900 my-4 rounded-lg focus-within:border-primary-900 transition-all">
    <div v-if="props.title" class="mt-[-30px]"><h2 class=" px-2 bg-neutral-950 text-xl text-neutral-100 inline-block">{{ $t(props.title) }}</h2></div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: false
    }
  })
</script>

<style scoped>

</style>