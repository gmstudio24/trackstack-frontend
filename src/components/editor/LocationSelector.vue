<template>
  <div>
    <InputWrapper :label="$t(props.label)">
      <div class="p-2 border-1 px-4 input-field flex flex-row items-center">
        <div class="pl-2 pr-4 border-r-1 border-neutral-800 flex-1">
          <div class="text-md font-bold">{{ model ? model.name: 'brak' }}</div>
          <div class="text-sm">{{ model ? model.street + ', ' + model.number + ', ' + model.postal + ' ' + model.city + ', ' + model.country : '-' }}</div>
        </div>
        <div
          class="ml-2 p-2 hover:bg-neutral-800 hover:text-neutral-200 cursor-pointer transition rounded-sm text-neutral-400"
          @click="openModal"
        >
          Zmień
        </div>
      </div>
      <Modal
        v-if="modalOpen"
        @close="closeModal"
        @action="onAction"
        title="Select location"
      >
        <div>
          <TextInput @input="registerChange" class="w-full min-w-128" label="Wyszukaj" v-model="query"/>
        </div>
        <div>
          <DataTable
            :loading-list-lenght="5"
            :columns="[
              {key: 'id', label: 'fields.id', primary: true, hidden: true},
              {key: 'name', label: 'fields.name'},
              {key: 'address', value: (o: any) => `${o.street} ${o.number}, ${o.postal} ${o.city}, ${o.country}`, label: 'fields.address', extendable: true},
            ]"
            :rows="rows"
            :actions="[
              {
                label: 'common.set',
                icon: 'check',
                action: (row: any) => {
                  set(row);
                },
              }
            ]"
          />
        </div>
      </Modal>
    </InputWrapper>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Modal from "../blocks/Modal.vue";
import InputWrapper from "../input/InputWrapper.vue";
import TextInput from "../input/TextInput.vue";
import DataTable from "../datatable/DataTable.vue";
import { useApi } from "@/composables/useApi";
import { useInputUpdate } from "@/composables/input/useInputUpdate";
import { buildHttpQueryParams } from "@/utils/httpbuiler";

const modalOpen = ref(false);

const {get} = useApi();

const {registerChange, onChange} = useInputUpdate(300);

onChange(() => {
  update()
})

onMounted(() => {
  update()
})

const props = defineProps({
  label: {
    type: String,
    default: 'fields.location'
  }
})

const emit = defineEmits<{
  (event: "setlocation", value: string): void;
}>();

const onAction = ({name, value}: {name: string; value?: any}) => {
  switch (name) {
    case "set":
      break;
    case "cancel":
      closeModal();
  }
};

const rows = ref([])
const query = ref('')

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const set = (id: string) => {
  emit('setlocation', id)
  model.value = rows.value.find((r: any) => r.id === id)
  closeModal()
}

const model = defineModel<{
  id: string;
  name: string;
  number: string;
  postal: string;
  city: string;
  country: string;
  street: string;
} | undefined>(undefined)

const update = () => {
  get('locations/search' + buildHttpQueryParams({query: query.value})).then((response) => {
    rows.value = response.data.data
  })
}
</script>

<style scoped></style>
