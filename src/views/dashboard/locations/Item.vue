<template>
  <DashboardLayout :title="existing ? 'Edit item' : 'New Item'">
    <ObjectEditor
      route-back="/dashboard/locations"
      v-model="values"
      :is-new="!existing"
      :setup="editorSetup"
      :save="save"
      :delete="deleteItem"
      :exit="exit"
    >
      <Card :title="$t('common.items')">
        <DataTable
          :actions="itemsActions"
          :columns="itemsColumns"
          :rows="values.items"
        />
      </Card>
    </ObjectEditor>
  </DashboardLayout>
</template>

<script setup lang="ts">
import Card from "@/components/blocks/Card.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import DataTable from "@/components/datatable/DataTable.vue";
import ObjectEditor from "@/components/editor/ObjectEditor.vue";
import {useApi} from "@/composables/useApi";
import {
  DialogButtonsType,
  DialogResponse,
  useDialog,
} from "@/composables/useDialog";
import { useEditor } from "@/composables/useEditor";
import { useModelApi } from "@/composables/useModelApi";
import {useSafeLock} from "@/composables/useSafeLock";
import {computed, onMounted, readonly, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const {safeExit} = useEditor();

const {createModel, getModel, updateModel, deleteModel} = useModelApi('item')
const {get, patch, del, post} = useApi();

const modelId = computed(() => Array.isArray(route.params.id) ? route.params.id[0] : route.params.id)

const route = useRoute();
const {push} = useRouter();
const existing = ref(route.params.id !== undefined);

const makeSaveRequest = async () => {
  return updateModel(modelId.value, values.value);
};

const makeCreateRequest = async () => {
  return createModel(values.value)
};

const save = () => {
  return new Promise<Object>((resolve, reject) => {
    (route.params.id ? makeSaveRequest() : makeCreateRequest())
      .then((r) => {
        resolve(r.data);
        push("/dashboard/locations/" + r.data.id);
        values.value = r.data;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteItem = () => {
  return deleteModel(modelId.value)
};

const exit = () => {
};

const editorSetup = {
  fieldgroups: [
    {
      name: "meta",
      label: "common.meta",
      fields: [
        {name: "id", label: "ID", type: "text", readonly: true},
        {
          name: "created_at",
          label: "Created At",
          type: "date",
          readonly: true,
        },
        {
          name: "updated_at",
          label: "Updated At",
          type: "date",
          readonly: true,
        },
      ],
    },
    {
      name: "address",
      label: "fields.address",
      fields: [
        {name: "name", label: "fields.name", type: "text"},
        {name: "street", label: "fields.street", type: "text"},
        {name: "number", label: "fields.number", type: "text"},
        {name: "postal", label: "fields.postal", type: "text"},
        {name: "city", label: "fields.city", type: "text"},
        {name: "country", label: "fields.country", type: "text"},
      ],
    },
    {
      name: "position",
      label: "fields.geolocation",
      description: "common.wipFeature",
      fields: [
        {name: "lat", label: "fields.latitude", type: "text", readonly: true},
        {name: "lng", label: "fields.longitude", type: "text", readonly: true},
      ],
    },
  ],
};

const itemsColumns = ref([
  {key: "id", label: "fields.id", meta: true, primary: true, hidden: true},
  {key: "name", label: "fields.name"},
  {key: "description", label: "fields.description", extendable: true},
  {key: "since", label: "fields.since", date: true},
]);

const values = ref<Record<string, any>>({});

const itemsActions = ref<Array<any>>([
  {
    label: "common.open",
    icon: "pencil",
    action: (row: any) => {
      safeExit().then((canExit) => {
        if (canExit) push("/dashboard/items/" + row);
      });
    },
  },
]);

onMounted(() => {
  get("locations/" + route.params.id + "/").then((response) => {
    values.value = response.data;
  });
});
</script>

<style scoped></style>
