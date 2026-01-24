<template>
  <ModelSearch :settings="settings" :data="data"></ModelSearch>
  <Modal v-if="showModal" title="Wydruk" @close="showModal = false">
    <LocationSelector label="fields.location" v-model="printLocation" />
    <DataTable :columns="columns" :rows="selected" no-actions/>
    <Button class="m-1" primary icon="document-check" @click="submitDocument">Wydrukuj</Button>
  </Modal>
</template>

<script setup lang="ts">
import LocationSelector from "@/components/editor/LocationSelector.vue";
import DataTable from "@/components/datatable/DataTable.vue";
import Button from "@/components/buttons/Button.vue";
import ModelSearch from "@/components/model/ModelSearch.vue";
import Modal from "@/components/blocks/Modal.vue";
import {useApi} from "@/composables/useApi";
import {
  DialogButtonsType,
  DialogResponse,
  useDialog,
} from "@/composables/useDialog";
import {useModelSearch} from "@/composables/useModelSearch";
import {ref} from "vue";
import {useRouter} from "vue-router";

const {push} = useRouter();
const {openDialog} = useDialog();

const columns = ref([
  {key: "id", label: "fields.id", meta: true, primary: true, hidden: true},
  {key: "name", label: "fields.name"},
  {key: "description", label: "fields.description", extendable: true},
  {key: "address", label: "fields.address", value: (o: any) => o.location.address, filterable: false},
  {key: "location_id", label: "fields.location", hidden: true},
  {key: "created_at", label: "fields.createdAt", meta: true},
  {key: "updated_at", label: "fields.modifiedAt", meta: true},
]);

const {settings, data} = useModelSearch({
  modelName: "item",
  table: {
    columns: columns.value,
    selectable: true,
    actions: [
      {
        label: "common.edit",
        icon: "pencil",
        action: (row: any) => {
          push("/dashboard/items/" + row);
        },
      },
    ],
  },
  actions: [
    {
      label: "common.create",
      icon: "plus",
      action: () => {
        push("/dashboard/items/new");
      },
      primary: true
    },
    {
      label: "common.print",
      icon: "document-check",
      action: (all, selectedV) => {
        showModal.value = true;
        selected.value = selectedV;
        console.log("selected", selectedV);
      },
    }
  ],
  pagination: {
    perPage: [10, 50, 100],
  },
});

const {post} = useApi();

const showModal = ref(false);

const selected = ref<any[]>([]);

const printLocation = ref({
  id: "",
  name: "",
  street: "",
  number: "",
  city: "",
  country: "",
  postal: "",
  address: "",
});

const submitDocument = () => {
  showModal.value = false;
  post("documents/create", {
    location: printLocation.value,
    items: selected.value,
  }).then((response) => {
    window.open(
      "https://api.trackstack.dev.gmstudio24.pl/documents/view/" + response.data.id,
      "_blank"
    );
  });
};
</script>

<style scoped></style>
