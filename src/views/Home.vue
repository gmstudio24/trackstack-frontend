<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-center mb-4">
      <h1 class="text-6xl font-bold text-primary-500">Trackstack</h1>
      <span class="text-neutral-500">v{{ version }}</span>
    </div>
    <Button to="/login">Logowanie</Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/buttons/Button.vue';

const version = __APP_VERSION__;
</script>

<style scoped></style>
