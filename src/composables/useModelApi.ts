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

export type IndexResponse<T = any> = {
  data: T[],
  meta: PaginationMeta
}

export const useModelApi = <T = any>(modelName: string, options: UseModelApiOptions = {}) => {

  const modelUrl = options.modelUrl ?? `${modelName}s`;

  const {get} = useApi();

  const index = async ({page = 1, perPage = 20, sortBy}: IndexOptions = {}): Promise<IndexResponse<T>> => {
    return get(modelUrl + buildHttpQueryParams({page, per_page: perPage, sort_by: sortBy})).then(data => data.data).catch(() => {
      useError('error.cannotIndexModel.' + modelName)
    })
  }

  return {index}
}