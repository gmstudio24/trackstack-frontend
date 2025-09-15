<template>
  <DashboardLayout title="Items">
    <SortingBar :columns="columns" :filters="sortingBubbles">
      <Button class="m-1" primary icon="plus" :to="'/dashboard/locations/new'"
        >New Item</Button
      >
    </SortingBar>
    <DataTable :columns="columns" :rows="rows" :actions="actions" />
    <Pagination :total="2000" :perPage="[10, 50, 100]" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "@/components/DashboardLayout.vue";
import DataTable from "@/components/datatable/DataTable.vue";
import Pagination from "@/components/datatable/Pagination.vue";
import SortingBar from "@/components/datatable/SortingBar.vue";
import Button from "@/components/buttons/Button.vue";
import {useApi} from "@/composables/useApi";
import {
  DialogButtonsType,
  DialogResponse,
  useDialog,
} from "@/composables/useDialog";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const {get, del} = useApi();

const {push} = useRouter();

const {openDialog} = useDialog();

const columns = ref([
  {key: "id", label: "fields.id", meta: true, primary: true, hidden: true},
  {key: "name", label: "fields.name", extendable: true},
  {key: "street", label: "fields.street"},
  {key: "number", label: "fields.number"},
  {key: "city", label: "fields.city"},
  {key: "postal", label: "fields.postal"},
  {key: "country", label: "fields.country"},
  {key: "created_at", label: "fields.createdAt", meta: true},
  {key: "updated_at", label: "fields.modifiedAt", meta: true},
]);

const rows = ref([]);

const sortingBubbles = ref([
  {
    key: "created_at",
    label: "Created At",
    toggle: (key: string) => {
      console.log("Toggled sorting bubble for key:", key);
    },
  },
  {
    key: "updated_at",
    label: "Updated At",
    toggle: (key: string) => {
      console.log("Toggled sorting bubble for key:", key);
    },
  },
  {
    key: "address",
    label: "Name",
    toggle: (key: string) => {
      console.log("Toggled sorting bubble for key:", key);
    },
  },
  {
    key: "description",
    label: "Description",
    toggle: (key: string) => {
      console.log("Toggled sorting bubble for key:", key);
    },
  },
]);

const actions = [
  {
    label: "common.edit",
    icon: "pencil",
    action: (row: any) => {
      push("/dashboard/locations/" + row);
    },
  },
  {
    label: "common.delete",
    icon: "trash",
    action: (row: any) => {
      openDialog(
        "dashboard.editor.confirmDelete",
        "dashboard.editor.confirmDeleteMessage",
        DialogButtonsType.YES_NO
      ).then((response) => {
        switch (response) {
          case DialogResponse.YES:
            deleteItem(row);
            break;
          case DialogResponse.NO:
            break;
        }
      });
    },
  },
];

const updateItems = () => {
  get("locations").then((response) => {
    rows.value = response.data;
  });
};

const deleteItem = (id: string) => {
  del("locations/" + id).then(() => {
    updateItems();
  });
};

onMounted(() => {
  updateItems();
});
</script>

<style scoped></style>
