import { PaginationMeta } from "@/types/PaginationMeta"
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

  const {get, patch, del, post} = useApi();

  const handleApiError = (e: any) => {
    const errors = e.response.data.errors;
    Object.keys(errors).forEach(key => {
      useError(errors[key][0])
    })
  }

  const index = async ({page = 1, perPage = 20, sortBy}: IndexOptions = {}): Promise<IndexResponse<T>> => {
    return get(modelUrl + buildHttpQueryParams({page, per_page: perPage, sort_by: sortBy})).then(data => data.data).catch(handleApiError)
  }

  const createModel = async (data: T): Promise<any> => {
    return post(modelUrl, data).then(data => data.data).catch(handleApiError)
  }

  const getModel = async (id: string): Promise<any> => {
    return get(`${modelUrl}/${id}`).then(data => data.data).catch(handleApiError)
  }

  const updateModel = async (id: string, data: T): Promise<any> => {
    return patch(`${modelUrl}/${id}`, data).then(data => data.data).catch(handleApiError)
  }

  const deleteModel = async (id: string): Promise<void> => {
    return del(`${modelUrl}/${id}`).then(data => data.data).catch(handleApiError)
  }

  return {index, createModel, getModel, updateModel, deleteModel}
}