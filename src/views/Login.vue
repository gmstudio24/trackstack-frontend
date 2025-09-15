<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="w-96 p-8 corner-8 border-1 bg-neutral-900 border-neutral-800 rounded-xl inline-block">
      <div>
        <h1 class="text-xl text-center font-bold text-neutral-100">Logowanie</h1>
        <div class="text-xs text-center text-neutral-400">TrackStack v0.0.1</div>
      </div>
      <div>
        <TextInput id="email" type="email" label="Email" 
        placeholder="Adres e-mail" v-model="email"/>
        <TextInput id="password" type="password" label="Hasło" 
        placeholder="Hasło" v-model="password"/>
      </div>
      <div>
        <PrimaryButton full-width>Logowanie</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '../components/input/TextInput.vue';
import PrimaryButton from '../components/buttons/Button.vue';
const email = ref('');
const password = ref('');

</script>

<style scoped>

</style>