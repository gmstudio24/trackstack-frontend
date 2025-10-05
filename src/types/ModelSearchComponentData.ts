import { Ref } from "vue"

export type ModelSearchComponentData<T = any> = {
  table: {
    data: T[]
    selected: T[]
  },
  filters: {
    sortBy: string
  }
  pagination: {
    page: number
    pages: number
    limit: number
  }
}