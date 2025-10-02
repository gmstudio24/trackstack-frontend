import { PaginationMeta } from "@/types/PaginationMeta"
import { useAlert } from "./useAlert"
import { useApi } from "./useApi"
import { useError } from "./useError"
import { buildHttpQueryParams } from "@/utils/httpbuiler"

export type UseModelApiOptions = {
  modelUrl?: string
}

export type IndexOptions = {
  page?: number,
  perPage?: number,
  sortBy?: string
}

export type IndexResponse = {
  data: object[],
  meta: PaginationMeta
}

export const useModelApi = (modelName: string, options: UseModelApiOptions = {}) => {

  const modelUrl = options.modelUrl ?? `${modelName}s`;

  const {get} = useApi();

  const index = async ({page = 1, perPage = 20, sortBy}: IndexOptions = {}): Promise<IndexResponse> => {
    return get(modelUrl + buildHttpQueryParams({page, per_page: perPage, sort_by: sortBy})).then(data => data.data).catch(() => {
      useError('error.cannotIndexModel.' + modelName)
    })
  }

  return {index}
}