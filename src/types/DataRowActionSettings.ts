export type DataRowActionsSettings<T = any> = {
  label: string
  icon: string
  action: (row: T) => void
}