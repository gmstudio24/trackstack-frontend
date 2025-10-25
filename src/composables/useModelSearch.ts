import {ModelSearchComponentData} from "@/types/ModelSearchComponentData";
import {ModelSearchSettings} from "@/types/ModelSearchSettings";
import {onMounted, reactive, ref, watch} from "vue";
import {useModelApi} from "./useModelApi";

export const useModelSearch = <T = any>(settings: ModelSearchSettings) => {

  const {index} = useModelApi(settings.modelName);

  const data: ModelSearchComponentData<T> = reactive({
    table: {
      data: [],
      selected: [],
    },
    filters: {
      sortBy: 'id',
      direction: 'asc',
    },
    pagination: {
      page: 1,
      pages: 1,
      limit: 50,
    },
  });

  const indexData = async () => {
    const results = await index({
      page: data.pagination.page,
      perPage: data.pagination.limit,
      sortBy: data.filters.sortBy,
      direction: data.filters.direction,
    });
    data.table.data = results.data;
    data.pagination.page = results.meta.current_page;
    data.pagination.pages = results.meta.last_page;
  };

  watch(
    [
      () => data.pagination.limit,
      () => data.pagination.page,
      () => data.filters,
    ],
    () => {
      indexData();
    }, 
    {deep: true}
  );

  onMounted(() => {
    indexData()
  })

  return {settings, data};
};
