<template>
  <main class="p-4 h-full flex flex-col overflow-y-auto">
      <div v-if="title">
        <h1 class="text-3xl font-bold mb-2">
          {{ title }}
        </h1>
      </div>
      <div class="flex-1 flex-shrink flex flex-col">
        <slot />
      </div>
    </main>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<style scoped>

</style>