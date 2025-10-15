<template>
  <DashboardLayout :title="$t('pages.overview.menu')">
    <Card title="Informacja">
      <span class="text-primary-400 font-bold">Jest to wczesna rozwojowa wersja aplikacji. Niektóre funkcje mogą zawierać błędy.</span>
    </Card>
    <Card title="Nowości w wersji 0.2.0">
      <ul class="mt-2">
        <li v-for="value in newsFeed">-<span class="font-bold text-primary-400 ml-2">{{ value.location }}:</span> {{ value.message }}</li>
      </ul>
    </Card>
  </DashboardLayout>
</template>

<script setup lang="ts">
import Card from '@/components/blocks/Card.vue';
import DashboardLayout from '@/components/DashboardLayout.vue';
import { ref } from 'vue';

const newsFeed = ref([{
  location: 'Wyszukiwanie',
  message: 'sortowanie przy wyszukiwaniu'
}, {
  location: 'Widok pojedynczej lokalizacji',
  message: 'wyświetlanie listy aktualnie przebywających tam stojaków.'
},
{
  location: 'Stojaki',
  message: 'historia zmiany lokalizacji stojaków.'
},
{
  location: 'Logowanie',
  message: 'dane widoczne dopiero po logowaniu.'
},
{
  location: 'Edytor',
  message: 'usuwanie elementów.',
},
{
  location: 'System',
  message: 'potwierdzenie zapisania elementu lub komunikat o błędzie.',
},
{
  location: 'System',
  message: 'naprawienie niektórych błędów.',
},
])


</script>

<style scoped>

</style>