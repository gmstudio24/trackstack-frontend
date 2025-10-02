export type PaginationMeta = {
    current_page: number,
    last_page: number,
    from: number,
    to: number,
    per_page: number,
    path: string,
    total: number,
    links: {
      url: string
      label: string
      active: boolean
    }[]
  }