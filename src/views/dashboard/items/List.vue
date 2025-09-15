<template>
  <DashboardLayout title="Items">
    <SortingBar :columns="columns" :filters="sortingBubbles">
      <Button class="m-1" :disabled="selectedRows?.length === 0" @click="showModal = true" icon="paper-clip">Wydruk</Button>
      <Button class="m-1" primary icon="plus" :to="'/dashboard/items/new'">New Item</Button>
    </SortingBar>
    <DataTable v-model="selectedRows" :columns="columns" :rows="rows" :actions="actions" selectable />
    <Pagination :total="2000" :perPage="[10, 50, 100]" /> 
  </DashboardLayout>
  <Modal v-if="showModal" title="Wydruk" @close="showModal = false">
    <LocationSelector label="fields.location" v-model="printLocation" />
    <DataTable :columns="columns" :rows="selectedRows" no-actions/>
    <Button class="m-1" primary icon="document-check" @click="submitDocument">Wydrukuj</Button>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/blocks/Modal.vue';
import Button from '@/components/buttons/Button.vue';
import DashboardLayout from '@/components/DashboardLayout.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Pagination from '@/components/datatable/Pagination.vue';
import SortingBar from '@/components/datatable/SortingBar.vue';
import LocationSelector from '@/components/editor/LocationSelector.vue';
import { useApi } from '@/composables/useApi';
import { DialogButtonsType, DialogResponse, useDialog } from '@/composables/useDialog';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const { push } = useRouter()
const { get } = useApi()
const { openDialog } = useDialog()

const columns = ref([
  { key: 'id', label: 'fields.id', meta: true, primary: true, hidden: true },
  { key: 'name', label: 'fields.name' },
  { key: 'description', label: 'fields.description', extendable: true },
  { key: 'address', label: 'fields.address', value: (o: any) => o.location.address },
  { key: 'created_at', label: 'fields.createdAt', meta: true },
  { key: 'updated_at', label: 'fields.modifiedAt', meta: true },
])

const {post} = useApi();

const rows = ref([]);

const showModal = ref(false)

const selectedRows = ref([])

const printLocation = ref({
  id: '',
  name: '',
  street: '',
  number: '',
  city: '',
  country: '',
  postal: '',
  address: ''
})


  // { id: '8a5104f5-e557-4870-84e3-51e2ee3f6181', created_at: '2023-01-01 14:10:12', updated_at: '2023-01-02 16:52:18', name: 'Item 1', description: 'Description of Item 1' },
  // { id: 'a339df58-fe88-45b9-838b-ccc5a579c4f5', created_at: '2023-01-03 17:47:42', updated_at: '2023-01-04 08:56:37', name: 'Item 2', description: 'Description of Item 2' },
  // { id: '41d4b634-4962-4fa4-b3b8-57dbeb3b927d', created_at: '2023-01-05 10:23:04', updated_at: '2023-01-06 13:22:05', name: 'Item 3', description: 'Description of Item 3' }


const sortingBubbles = ref([
  { key: 'created_at', label: 'Created At', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) } },
  { key: 'updated_at', label: 'Updated At', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) }  },
  { key: 'name', label: 'Name', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) }  },
  { key: 'description', label: 'Description', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) }  }
])


const actions = [
  {
    label: 'common.edit',
    icon: 'pencil',
    action: (row: any) => {
      push('/dashboard/items/' + row)
    }
  },
  {
    label: 'common.delete',
    icon: 'trash',
    action: (row: any) => {
      openDialog('dashboard.editor.confirmDelete', 'dashboard.editor.confirmDeleteMessage', DialogButtonsType.YES_NO).then((response) => {
        switch(response) {
          case DialogResponse.YES:
            console.log('Delete action for row:', row);
            break
          case DialogResponse.NO:
            break
        }
      })
      console.log('Delete action for row:', row);
    }
  }
]

onMounted(() => {
  get('items').then((response) => {
    rows.value = response.data
  })
})

const submitDocument = () => {
  showModal.value = false
  post('documents/create', {
    location: printLocation.value,
    items: selectedRows.value})
  .then((response) => {
    window.open('http://trackstack.test/documents/view/' + response.data.id, '_blank')
  })
}

</script>

<style scoped>

</style>