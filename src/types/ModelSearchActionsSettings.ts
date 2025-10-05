export type ModelSearchActionSettings<T = any> = {
  label: string
  icon: string
  action: (all: T[], selected: T[]) => void
  primary?: boolean
}