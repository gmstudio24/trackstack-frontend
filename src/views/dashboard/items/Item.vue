<template>
  <DashboardLayout :title="existing ? 'Edycja' : 'Nowy element'">
    <ObjectEditor
      route-back="/dashboard/items"
      v-model="values"
      :setup="editorSetup"
      :save="save"
      :delete="deleteItem"
      :exit="exit"
    >
      <Card :title="$t('common.events')">
        <DataTable
          no-actions
          :columns="[
            {key: 'id', label: 'fields.id', primary: true, hidden: true},
            {key: 'time', label: 'fields.time', date: true},
            {key: 'type', value: e=>$t('events.type.'+e.type), label: 'fields.type'},
            {key: 'location', value: e => e.location.address, label: 'fields.location'},
          ]"
          :rows="values.events ?? []"
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
import {onMounted, readonly, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const {get, patch, put, post} = useApi();

const route = useRoute();

const {push} = useRouter();

const existing = ref(route.params.id !== undefined);

const makeSaveRequest = async () => {
  return patch("items/" + route.params.id, values.value);
};

const makeCreateRequest = async () => {
  return post("items", values.value);
};

const save = () => {
  return new Promise<void | Object>((resolve, reject) => {
    (route.params.id ? makeSaveRequest() : makeCreateRequest())
      .then((r) => {
        resolve(r.data);
        push("/dashboard/items/" + r.data.id);
        values.value = r.data;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteItem = () => {
  console.log("delete");
};

const exit = () => {
  console.log("exit");
};

const values = ref<Record<string, any>>({});

const editorSetup = {
  fieldgroups: [
    {
      name: "meta",
      label: "common.meta",
      fields: [
        {name: "id", label: "fields.id", type: "text", readonly: true},
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
      name: "content",
      label: "common.content",
      fields: [
        {name: "name", label: "Name", type: "text"},
        {name: "description", label: "fields.description", type: "textarea"},
        {
          name: "location",
          label: "fields.location",
          type: "location",
          baseName: "location_id",
        },
        {
          name: "base_location",
          label: "fields.baseLocation",
          type: "location",
          baseName: "base_location_id",
        },
      ],
    },
  ],
};

onMounted(() => {
  get("items/" + route.params.id + "/").then((response) => {
    values.value = response.data;
  });
});
</script>

<style scoped></style>
