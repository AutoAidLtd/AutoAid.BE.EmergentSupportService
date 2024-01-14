import { Pageable } from "./Pageable";

export interface PagedList<T>{
  rows: T[],
  pagination: Pageable
}
