export type DataColumnSettings = {
    key: string
    label: string
    type?: string
    primary?: boolean
    meta?: boolean
    extendable?: boolean
    sortable?: boolean
    value?: (row: any) => any
    readonly?: boolean
    filterable?: boolean
    hidden?: boolean
    baseName?: string
  }