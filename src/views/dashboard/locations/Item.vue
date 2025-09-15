<template>
  <DashboardLayout :title="existing ? 'Edit item' : 'New Item'">
    <ObjectEditor
      route-back="/dashboard/locations"
      v-model="values"
      :setup="editorSetup"
      :save="save"
      :delete="deleteItem"
      :exit="exit"
    />
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "@/components/DashboardLayout.vue";
import ObjectEditor from "@/components/editor/ObjectEditor.vue";
import {useApi} from "@/composables/useApi";
import {onMounted, readonly, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const {get, patch, del, post} = useApi();

const route = useRoute();
const {push} = useRouter()
const existing = ref(route.params.id !== undefined);

const makeSaveRequest = async () => {
  return patch("locations/" + route.params.id, values.value);
};

const makeCreateRequest = async () => {
  return post("locations", values.value);
};

const save = () => {
  return new Promise<Object>((resolve, reject) => {
    (route.params.id ? makeSaveRequest() : makeCreateRequest())
      .then((r) => {
        resolve(r.data);
        push('/dashboard/locations/' + r.data.id)
        values.value = r.data
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteItem = () => {
  del('locations/' + route.params.id).then(() => {
    push('/dashboard/locations')
  })
};

const exit = () => {
  console.log("exit");
};

const editorSetup = {
  fieldgroups: [
    {
      name: "meta",
      label: "Meta",
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
      label: "Address",
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
      label: "Geoloc",
      fields: [
        {name: "lat", label: "fields.latitude", type: "text"},
        {name: "lng", label: "fields.longitude", type: "text"},
      ],
    }
  ],
};

const values = ref({});

onMounted(() => {
  get("locations/" + route.params.id + "/").then((response) => {
    values.value = response.data;
  });
});
</script>

<style scoped></style>
