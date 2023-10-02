import { action, computed, makeObservable, observable } from "mobx";
import { SetURLSearchParams } from "react-router-dom";
import { QUERY_PARAMS } from "config/queryParams";
import { PRODUCTS_PER_PAGE } from "store/ProductsStore";
import { ILocalStore } from "utils/useLocalStore";
import { IPaginationStore } from "./types";

type PrivateFields = "_curPage" | "_totalPages";

export default class PaginationStore implements IPaginationStore, ILocalStore {
  private _curPage: number;
  private _totalPages: number = 0;
  private _pagesToShow: number;
  private _searchParams: URLSearchParams;
  private _setSearchParams: SetURLSearchParams;

  constructor(
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
    itemsLength: number,
    pagesToShow: number = 3
  ) {
    makeObservable<PaginationStore, PrivateFields>(this, {
      _curPage: observable,
      _totalPages: observable,
      curPage: computed,
      totalPages: computed,
      startEndPages: computed,
      goToPage: action,
      nextPage: action.bound,
      prevPage: action.bound,
    });
    this._curPage = parseInt(searchParams.get(QUERY_PARAMS.PAGE) || "1");
    this._totalPages = Math.ceil(itemsLength / PRODUCTS_PER_PAGE);
    this._pagesToShow = pagesToShow;
    this._searchParams = searchParams;
    this._setSearchParams = setSearchParams;
  }

  get curPage(): number {
    return this._curPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get startEndPages(): { startPage: number; endPage: number } {
    let startPage = this._curPage - Math.floor(this._pagesToShow / 2);
    let endPage = this._curPage + Math.floor(this._pagesToShow / 2);

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(this._pagesToShow, this._totalPages);
    }

    if (endPage > this._totalPages) {
      endPage = this._totalPages;
      startPage = Math.max(this._totalPages - this._pagesToShow + 1, 1);
    }

    return { startPage: startPage, endPage: endPage };
  }

  goToPage(page: number): void {
    this._searchParams.set(QUERY_PARAMS.PAGE, String(page));
    this._setSearchParams(this._searchParams);
  }

  prevPage(): void {
    if (this._curPage > 1) {
      this.goToPage(this._curPage - 1);
    }
  }

  nextPage(): void {
    if (this._curPage < this._totalPages) {
      this.goToPage(this._curPage + 1);
    }
  }

  destroy(): void {}
}
