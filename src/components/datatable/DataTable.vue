<template>
    <div class="flex flex-col flex-1 overflow-x-auto overflow-y-auto" v-auto-animate>
        <div v-if="props.selectable">
          <Button :disabled="selectedRows?.length === 0" @click="selectedRows = []">Odznacz wszystko</Button>
          <span class="ml-4">Zaznaczone: {{ selectedRows?.length }}</span>
        </div>
        <table class="min-w-full max-h-full">
            <thead class="">
                <tr class="">
                    <th
                        class="text-neutral-100 p-4 text-left"
                        v-for="column in props.columns.filter((c) => !c.hidden)"
                        :key="column.key"
                        :class="{'w-full' : column.extendable}"
                    >
                        {{ $t(column.label) }}
                    </th>
                    <th v-if="!props.noActions" class="w-full text-neutral-100 p-4 text-left">
                        {{ $t('common.actions') }}
                    </th>
                </tr>
            </thead>
            <tbody v-if="!loading" class="overflow-auto">
                <tr
                    v-for="(row, index) in props.rows"
                    :key="index"
                    class="hover:bg-neutral-900 transition-colors"
                    :class="{'bg-neutral-800 hover:!bg-neutral-700': selectedRows?.includes(row), 'cursor-pointer': props.selectable}"
                    @click="props.selectable ? toggleSelectRow(row) : () => {}"
                >
                    <td
                        class="text-nowrap text-neutral-300 px-4 py-2 border-b-1 border-neutral-900"
                        v-for="column in props.columns.filter((c) => !c.hidden)"
                        :key="column.key"
                        :class="{ 'text-neutral-500 text-sm': column.meta }"
                    >
                        {{ getCellValue(row, column) }}
                    </td>
                    <td
                        v-if="!props.noActions"
                        class="text-nowrap text-neutral-300 px-4 border-b-1 border-neutral-900"
                    >
                        <ActionButton
                            v-for="action in props.actions"
                            :label="action.label"
                            :icon="action.icon"
                            :action="() => action.action(getPrimaryColumn(row))"
                        />
                    </td>
                </tr>
            </tbody>

            <tbody v-else>
                <tr
                    v-for="index in props.loadingListLenght"
                    :key="index"
                    class="hover:bg-neutral-900 transition-colors"
                >
                    <td
                        class="text-neutral-300 px-4 py-2 border-b-1 border-neutral-900"
                        v-for="column in props.columns"
                        :key="column.key"
                        :class="{ 'text-neutral-500 text-sm': column.primary }"
                    >
                        <TextLoadingPlaceholder />
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="!loading && props.rows?.length === 0" class="text-center text-neutral-500 text-sm mb-8">
          Brak wyników
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import TextLoadingPlaceholder from "../TextLoadingPlaceholder.vue";
import ActionButton from "./ActionButton.vue";
import Button from "../buttons/Button.vue";

const selectedRows = defineModel<Object[]>();

const props = defineProps({
    columns: {
        type: Array as () => Array<{
            key: string;
            value?: (o: Record<string, any>) => any;
            label: string;
            primary?: boolean;
            meta?: boolean;
            date?: boolean;
            extendable?: boolean;
            hidden?: boolean;
        }>,
        required: true,
    },
    rows: {
        type: Array as () => Array<Record<string, any>> | undefined,
        required: true,
    },
    actions: {
        type: Array as () => Array<{
            label: string;
            icon?: string;
            action: (arg: string | number) => any;
        }>,
    },
    loadingListLenght: {
        type: Number,
        default: 25
    },
    noActions: {
        type: Boolean,
        default: false
    },
    selectable: {
        type: Boolean,
        default: false
    }
});

const getMessage = () => {
  return 'test'
}

const toggleSelectRow = (row: Record<string, any>) => {
  if(!selectedRows.value) selectedRows.value = []
  if(selectedRows.value.includes(row)) {
    selectedRows.value = selectedRows.value.filter((r) => r !== row)
    return
  }
  selectedRows.value.push(row)
}

const loading = computed(() => {
    return props.rows === undefined;
});

const getPrimaryColumn = (row: Record<string, any>) => {
    const primaryColumn = props.columns.find((col) => (col.primary));
    return primaryColumn ? row[primaryColumn.key] : "";
};

const getCellValue = (row: Record<string, any>, column: Record<string, any>) => {
  if(column.value) {
    return column.value(row)
  }
  return column.date ? convertDate(row[column.key]) : row[column.key] 
}

const convertDate = (date: string) => {
    const dateObject = new Date(date);
    return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;
};
</script>

<style scoped></style>
