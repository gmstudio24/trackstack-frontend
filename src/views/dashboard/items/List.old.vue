<template>
  <DashboardLayout title="Items">
    <SortingBar @update:sort-by="updateSortBy" @update:limit="updateLimit" :columns="columns" :filters="sortingBubbles">
      <Button class="m-1" :disabled="selectedRows?.length === 0" @click="showModal = true" icon="paper-clip">Wydruk</Button>
      <Button class="m-1" primary icon="plus" :to="'/dashboard/items/new'">New Item</Button>
    </SortingBar>
    <DataTable v-model="selectedRows" :columns="columns" :rows="rows" :actions="actions" selectable />
    <Pagination @paginate="(page: number) => {filters.page = page}" :page="filters.page" :pages="pagination.pages"/> 
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
import { useModelApi } from '@/composables/useModelApi';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const { push } = useRouter()
const { index } = useModelApi('item')
const { openDialog } = useDialog()

const updateSortBy = (key: string) => {
  filters.value.sortBy = key
}

const updateLimit = (key: number) => {
  
  filters.value.perPage = key
  filters.value.page = 1
}

const columns = ref([
  { key: 'id', label: 'fields.id', meta: true, primary: true, hidden: true },
  { key: 'name', label: 'fields.name' },
  { key: 'description', label: 'fields.description', extendable: true },
  { key: 'address', label: 'fields.address', value: (o: any) => o.location.address, filterable: false },
  { key : 'location_id', label: 'fields.location', hidden: true },
  { key: 'created_at', label: 'fields.createdAt', meta: true },
  { key: 'updated_at', label: 'fields.modifiedAt', meta: true },
])

const filters = ref({
  sortBy: 'name',
  page: 1,
  perPage: 50,
  filters: [],
})

const {post} = useApi();

const rows = ref<any[]>([]);

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

const sortingBubbles = ref([
  { key: 'created_at', label: 'Created At', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) } },
  { key: 'updated_at', label: 'Updated At', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) }  },
  { key: 'name', label: 'Name', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) }  },
  { key: 'description', label: 'Description', toggle: (key: string) => { console.log('Toggled sorting bubble for key:', key) }  }
])

watch(filters, (newValue) => {
  indexData()
}, {deep: true})

const indexData = async () => {
  const results = (await index({page: filters.value.page, perPage: filters.value.perPage, sortBy: filters.value.sortBy}));
  rows.value = results.data
  pagination.value.page = results.meta.current_page
  pagination.value.pages = results.meta.last_page
  selectedRows.value = []
}

const sorting = ref({
  sortBy: ''
})

const pagination = ref<{
  page: number,
  pages: number
}>({
  page: 1,
  pages: 1
})

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
  indexData();
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