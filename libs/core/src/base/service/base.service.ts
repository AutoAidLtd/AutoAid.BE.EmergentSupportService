import { Pageable, PagedList } from "../../common";

export interface BaseService<T, ID> {
  getList: (paging : Pageable) => Promise<PagedList<T>> | PagedList<T>,
  save: (element: T) => Promise<boolean> | boolean | Promise<ID> | ID,
  update : (element:T )=> Promise<boolean> | boolean
  delete: (element: T | ID)  => Promise<boolean> | boolean
}
