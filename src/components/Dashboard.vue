<template>
  <div class="flex h-screen">
    <MainNav :options="options" />
    <section v-auto-animate class="flex-1 overflow-hidden">
      <router-view />
    </section>
  </div>
</template>

<script setup lang="ts">
import MainNav from './nav/MainNav.vue';
import NavItem from './nav/NavItem.vue';

const props = defineProps<{
  title?: string;
}>();

const options = [
  { to: '/dashboard/overview', icon: 'home', label: 'Overview' },
  { to: '/dashboard/items', icon: 'circle-stack', label: 'Items' },
  { to: '/dashboard/locations', icon: 'map-pin', label: 'Locations' },
  { to: '/dashboard/settings', icon: 'cog', label: 'Settings' }
];

</script>

<style scoped>

</style>