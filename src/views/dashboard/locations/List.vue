<template>
  <ModelSearch :settings="settings" :data="data" />
</template>

<script setup lang="ts">
import ModelSearch from "@/components/model/ModelSearch.vue";
import {
  DialogButtonsType,
  DialogResponse,
  useDialog,
} from "@/composables/useDialog";
import {useModelSearch} from "@/composables/useModelSearch";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

const {push} = useRouter();
const {openDialog} = useDialog();

const {settings, data} = useModelSearch({
  modelName: "location",
  table: {
    columns: [
      {key: "id", label: "fields.id", meta: true, primary: true, hidden: true},
      {key: "name", label: "fields.name", extendable: true},
      {key: "street", label: "fields.street"},
      {key: "number", label: "fields.number"},
      {key: "city", label: "fields.city"},
      {key: "postal", label: "fields.postal"},
      {key: "country", label: "fields.country"},
      {key: "created_at", label: "fields.createdAt", meta: true},
      {key: "updated_at", label: "fields.modifiedAt", meta: true},
    ],
    actions: [
      {
        label: "common.edit",
        icon: "pencil",
        action: (row: any) => {
          push("/dashboard/locations/" + row);
        },
      },
    ],
  },
  actions: [
    {
      label: "common.create",
      icon: "plus",
      action: () => {
        push("/dashboard/locations/new");
      },
      primary: true
    },
  ],
  pagination: {
    perPage: [10, 50, 100],
  }
});

watch(data.table.data, (newData) => {
  console.log('Data changed', newData)
})
</script>

<style scoped></style>
