export interface Pageable {
  page: number,
  pageSize:number,
  totalItems?: number,
  totalPages?: number,
  sort?: {
    by: string,
    direction: "asc"| "desc"
  }[],
  keyword?: string
}
