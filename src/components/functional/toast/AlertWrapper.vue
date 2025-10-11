<template>
  <Toast class="fixed bottom-0 right-0">
    <Alert
      v-for="alert, index in alerts"
      :timeout="alert.timeout ?? 3"
      :title="alert.title"
      :type="alert.type ?? 'info'"
      @close="closeAlert(alert)"
      :key="index"
      >{{ $t(alert.message) }}</Alert
    >
  </Toast>
</template>

<script setup lang="ts">
import Toast from "./Toast.vue";
import Alert from "./Alert.vue";
import {Alert as TAlert, useAlert} from "@/composables/useAlert";

const {alerts, remove} = useAlert();

const closeAlert = (alert: TAlert) => {
  if (alert.onClose) alert.onClose();
  remove(alert)
};
</script>

<style scoped></style>
