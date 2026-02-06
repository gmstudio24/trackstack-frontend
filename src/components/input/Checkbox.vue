<template>
  <div class="inline m-2 mx-4">
    <input type="checkbox" class="mr-2" :id="id" name="id" v-model="value" @change="emit('change')" />
    <label :for="id"><slot /></label>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';

const emit = defineEmits<{
  (event: "change"): void;
}>();

const value = defineModel<boolean>();

const id = useId();

</script>

<style scoped>

</style>