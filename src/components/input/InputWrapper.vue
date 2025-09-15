<template>
  <div class="mt-2 mb-2">
    <div class="mb-1 flex flex-row flex-wrap mx-2">
      <label :id="labelId" :for="props.labelFor">{{ $t(props.label) }}</label>
    </div>
    <div>
      <slot />
    </div>
    <div>
      <span v-if="props.message" class="text-xs mx-2" :class="{'text-red-700': props.invalid}"> {{ props.message }}</span>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    labelFor: {
      type: String,
      default: ''
    },
    labelId: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  })
</script>

<style scoped>

</style>