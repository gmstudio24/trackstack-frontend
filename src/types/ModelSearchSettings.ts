import { DataColumnSettings } from "./DataColumnSettings"
import { DataRowActionsSettings } from "./DataRowActionSettings"
import { ModelSearchActionSettings } from "./ModelSearchActionsSettings"

export type ModelSearchSettings = {
  modelName: string
  table: {
    columns: DataColumnSettings[]
    actions?: DataRowActionsSettings[]
    selectable?: boolean
  }
  actions?: ModelSearchActionSettings[]
  filters?: {
    sortBy?: string[]
  }
  pagination?: {
    perPage?: number[]
  }
}