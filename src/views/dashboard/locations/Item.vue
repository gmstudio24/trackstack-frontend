<template>
  <DashboardLayout
    :title="
      existing
        ? $t('pages.location.edit.title')
        : $t('pages.location.new.title')
    "
  >
    <ObjectEditor
      route-back="/dashboard/locations"
      v-model="values"
      :is-new="!existing"
      :setup="editorSetup"
      :save="save"
      :delete="deleteItem"
      :exit="exit"
      base-route="/dashboard/locations"
    >
      <Card :title="$t('common.items')">
        <DataTable
          :actions="itemsActions"
          :columns="itemsColumns"
          :rows="values.items"
        />
      </Card>
      <Card v-if="existing" :title="$t('pages.location.common.locationActions')">
        <Button @click="issueReminderDocument"
          >{{ $t('pages.location.common.makeReturnReminder') }}</Button
        >
        <Checkbox v-model="documentSettings.invoiceReminder"
          >{{ $t('pages.location.common.invoiceReminder') }}</Checkbox
        >
      </Card>
    </ObjectEditor>
  </DashboardLayout>
</template>

<script setup lang="ts">
import Card from "@/components/blocks/Card.vue";
import Button from "@/components/buttons/Button.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import DataTable from "@/components/datatable/DataTable.vue";
import ObjectEditor from "@/components/editor/ObjectEditor.vue";
import Checkbox from "@/components/input/Checkbox.vue";
import {useDocument} from "@/composables/documents/useDocument";
import {useApi} from "@/composables/useApi";
import {useEditor} from "@/composables/useEditor";
import {useModelApi} from "@/composables/useModelApi";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const {safeExit} = useEditor();

const {createModel, updateModel, deleteModel} = useModelApi("location");
const {get} = useApi();

const modelId = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
);

const {issueDocument, openDocument} = useDocument();

const route = useRoute();
const {push} = useRouter();
const existing = computed(() => route.params.id !== undefined);

const makeSaveRequest = async () => {
  return updateModel(modelId.value, values.value);
};

const makeCreateRequest = async () => {
  return createModel(values.value);
};

const save = async () =>
  route.params.id ? makeSaveRequest() : makeCreateRequest();

const deleteItem = () => {
  return deleteModel(modelId.value);
};

const exit = () => {};

const documentSettings = ref({
  invoiceReminder: false,
});

const editorSetup = {
  fieldgroups: [
    {
      name: "meta",
      label: "common.meta",
      fields: [
        {name: "id", label: "ID", type: "text", readonly: true},
        {
          name: "created_at",
          label: "fields.createdAt",
          type: "date",
          readonly: true,
        },
        {
          name: "updated_at",
          label: "fields.modifiedAt",
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
      expanded: false,
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

const issueReminderDocument = () => {
  issueDocument({
    type: "stand-return-reminder",
    location: values.value,
    items: values.value.items,
    data: {invoice_information: documentSettings.value.invoiceReminder},
  }).then((id) => {
    openDocument(id);
  });
};

onMounted(() => {
  values.value = {
    items: [],
  };
  if (existing.value) {
    get("locations/" + route.params.id).then((response) => {
      values.value = response.data;
    });
  }
});
</script>

<style scoped></style>
