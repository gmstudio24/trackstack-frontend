<script setup lang="ts">
import { computed, useId } from 'vue';
import InputWrapper from './InputWrapper.vue';

  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })

  const model = defineModel<string>({
    type: String,
    default: ''
  })
  
  const id = useId()

  const inputId = computed(() => {
    return props.id === '' ? id : props.id
  })
</script>

<template>
  <InputWrapper :label="props.label" :label-for="inputId" :invalid="props.invalid" :message="props.message">
    <input
      :id="inputId"
      :type="props.type"
      class="input-field"
      :class="{
        'border-red-800': props.invalid,
        'input-field-disabled': props.disabled,
      }"
      :disabled="props.disabled"
      :aria-disabled="props.disabled"
      :placeholder="props.placeholder"
      v-model="model"
    />
  </InputWrapper>
</template>

<style scoped>

</style>