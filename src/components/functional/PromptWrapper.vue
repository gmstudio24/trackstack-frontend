<template>
  <Transition name="fadescale" mode="out-in">
  <div v-if="prompts.length > 0" class="fixed w-screen h-screen bg-black/50 flex items-center justify-center z-50">
    <div v-if="prompts.length > 0" class="bg-neutral-900 border-1 border-neutral-800 p-6 rounded-xl shadow text-neutral-300">
      <div><h2 class="text-neutral-100 text-2xl mb-2">{{ $t(prompts[0].title) }}</h2></div>
      <div>{{ $t(prompts[0].message) }}</div>
      <div class="flex gap-2 mt-4 justify-center">
        <Button v-for="button in prompts[0].buttons" @click="button.action()" :primary="button.primary">{{ $t(button.label) }}</Button>
      </div>

    </div>
  </div>
  </Transition>
</template>

<script setup lang="ts">
import { DialogButtonsType, DialogResponse, useDialog } from '@/composables/useDialog';
import { onMounted, ref } from 'vue';
import Button from '../buttons/Button.vue';

  const {registerHandler} = useDialog();

  const prompts = ref<Array<{ title: string, message: string, buttons: Array<{ label: string, action: () => void, primary: boolean }> }>>([])

  const closePrompt = (index: number) => {
    prompts.value.splice(index, 1)
  }

  const resolveButtons = (buttons: DialogButtonsType, resolveFun: (response: DialogResponse) => any) => {
    const resolve = (response: DialogResponse) => {
      resolveFun(response)
      closePrompt(0)
    }
    switch(buttons) {
      case DialogButtonsType.OK:
        return [{ label: 'common.ok', action: () => {resolve(DialogResponse.OK)}, primary: true }]
      case DialogButtonsType.YES_NO:
        return [{ label: 'common.yes', action: () => {resolve(DialogResponse.YES)}, primary: true }, { label: 'common.no', action: () => {resolve(DialogResponse.NO)}, primary: false }]
      case DialogButtonsType.YES_NO_CANCEL:
        return [{ label: 'common.yes', action: () => {resolve(DialogResponse.YES)}, primary: true }, { label: 'common.no', action: () => {resolve(DialogResponse.NO)}, primary: false }, { label: 'common.cancel', action: () => {resolve(DialogResponse.CANCEL)}, primary: false }]
      default:
        return []
    }
  }

  const handler = (title: string, message: string, buttons: DialogButtonsType, resolve: (response: DialogResponse) => any): void => {
    prompts.value.push({ title, message, buttons: resolveButtons(buttons, resolve) })
  }

  onMounted(() => {
    registerHandler(handler);
  })
</script>

<style scoped>

</style>