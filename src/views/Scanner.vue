<template>
  <Transition>
    <div
      v-if="scanned"
      class="fixed w-screen h-screen top-0 left-0 bg-green-500/50 z-100"
    ></div>
  </Transition>
  <div class="h-screen w-screen flex items-center justify-center p-4">
    <StreamBarcodeReader
      class="[&>video]:min-w-full [&>video]:min-h-full w-64 h-64"
      @decode="onDecode"
      @loaded="onLoaded"
    ></StreamBarcodeReader>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {StreamBarcodeReader} from "vue-barcode-reader";

const scanned = ref(false);

const waiting = ref(false);

const onDecode = (result: any) => {
  if(waiting.value) return;
  scanned.value = true;
  waiting.value = true;
  setTimeout(() => {
    scanned.value = false;
  }, 300)
  setTimeout(() => {
    waiting.value = false;
  }, 1500)
};

const onLoaded = () => {
  console.log("loaded");
};
</script>

<style scoped></style>
