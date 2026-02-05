<template>
  <div class="flex flex-col gap-2 p-4 overflow-y-auto h-screen">
    <div>
      <h1 class="text-3xl">
        {{ $t("pages." + props.settings.modelName + ".search.title") }}
      </h1>
    </div>
    <div>
      <SortingBar
        @update:sort-by="
          (e) => {
            props.data.filters.sortBy = e.by;
            props.data.filters.direction = e.direction;
          }
        "
        @update:limit="
          (e) => {
            props.data.pagination.limit = e;
          }
        "
        :columns="props.settings.table.columns"
      >
        <Button
          v-for="(button, index) in props.settings.actions"
          :key="index"
          class="m-1"
          :action="
            () =>
              button.action(props.data.table.data, props.data.table.selected)
          "
          :icon="button.icon"
          :primary="button.primary"
          >{{ $t(button.label) }}</Button
        >
      </SortingBar>
    </div>
    <div class="flex-grow">
      <DataTable
        v-model="props.data.table.selected"
        :columns="props.settings.table.columns"
        :rows="props.data.table.data"
        :actions="props.settings.table.actions"
        :selectable="props.settings.table.selectable"
      />
    </div>
    <div>
      <Pagination
        @paginate="(page: number) => {props.data.pagination.page = page}"
        :page="props.data.pagination.page"
        :pages="props.data.pagination.pages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ModelSearchComponentData} from "@/types/ModelSearchComponentData";
import {ModelSearchSettings} from "@/types/ModelSearchSettings";
import DataTable from "../datatable/DataTable.vue";
import {watch} from "vue";
import SortingBar from "../datatable/SortingBar.vue";
import Pagination from "../datatable/Pagination.vue";
import Button from "../buttons/Button.vue";

const props = defineProps<{
  settings: ModelSearchSettings;
  data: ModelSearchComponentData;
}>();
</script>

<style scoped></style>
