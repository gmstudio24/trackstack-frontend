<template>
  <div class="flex h-screen">
    <MainNav :options="options" />
    <section v-auto-animate class="flex-1 overflow-hidden">
      <router-view />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import MainNav from './nav/MainNav.vue';
import NavItem from './nav/NavItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '@/composables/useApi';

const {authenticated} = useApi()
const router = useRouter();

onBeforeMount(() => {
  if(!authenticated.value) router.push('/login')
})

const props = defineProps<{
  title?: string;
}>();

const options = [
  { to: '/dashboard/overview', icon: 'home', label: 'pages.overview.menu' },
  { to: '/dashboard/items', icon: 'circle-stack', label: 'pages.item.menu' },
  { to: '/dashboard/locations', icon: 'map-pin', label: 'pages.location.menu' },
  { to: '/dashboard/settings', icon: 'cog', label: 'pages.settings.menu' }
];

</script>

<style scoped>

</style>