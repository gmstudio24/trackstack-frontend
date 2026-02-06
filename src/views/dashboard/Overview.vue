<template>
  <DashboardLayout :title="$t('pages.overview.menu')">
    <Card title="Informacja">
      <span class="text-primary-400 font-bold"
        >Jest to wczesna rozwojowa wersja aplikacji. Niektóre funkcje mogą
        zawierać błędy.</span
      >
    </Card>
    <Card v-for="news in newsFeed" :title="`Nowości w wersji ${news.version}`">
      <ul class="mt-2">
        <li v-for="value in news.items" >
          -<span class="font-bold text-primary-400 ml-2"
            >{{ value.location }}:</span
          >
          {{ value.message }}
        </li>
      </ul>
    </Card>
  </DashboardLayout>
</template>

<script setup lang="ts">
import Card from "@/components/blocks/Card.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import {ref, version} from "vue";

const newsFeed = ref([
  {
    version: "0.3.0",
    items: [
      {
        location: "Lokalizacja",
        message: "Dodanie dokumentu przypomnienia o zwrotach.",
      },
      {
        location: "System",
        message: "Naprawa istniejących błędów.",
      },
    ],
  },

  {
    version : "0.2.0",
    items: [
      {
        location: "Wyszukiwanie",
        message: "sortowanie przy wyszukiwaniu",
      },
      {
        location: "Widok pojedynczej lokalizacji",
        message: "wyświetlanie listy aktualnie przebywających tam stojaków.",
      },
      {
        location: "Stojaki",
        message: "historia zmiany lokalizacji stojaków.",
      },
      {
        location: "Logowanie",
        message: "dane widoczne dopiero po logowaniu.",
      },
      {
        location: "Edytor",
        message: "usuwanie elementów.",
      },
      {
        location: "System",
        message: "potwierdzenie zapisania elementu lub komunikat o błędzie.",
      },
      {
        location: "System",
        message: "naprawienie niektórych błędów.",
      },
    ],
  },
]);
</script>

<style scoped></style>
