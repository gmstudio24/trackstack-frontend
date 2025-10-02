<template>
  <PromptWrapper />
  <AlertWrapper />
  <div class="bg-neutral-950 min-h-screen min-w-screen text-neutral-200">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import PromptWrapper from './components/functional/PromptWrapper.vue';
import { onMounted } from 'vue';
import AlertWrapper from './components/functional/toast/AlertWrapper.vue';
const {getCsrfToken} = useApi()
onMounted(() => {
  getCsrfToken()
})
</script>

<style scoped>

</style>