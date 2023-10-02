import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
  IReactionDisposer,
  reaction,
} from "mobx";

import { API_ENDPOINTS } from "config/api";
import { Meta, HTTPMethod } from "config/globalEnums";
import rootStore from "store/RootStore/instance";
import {
  ProductItemApi,
  ProductItemModel,
  normalizeProductItem,
} from "store/models/products";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import { ILocalStore } from "utils/useLocalStore";

import { GetProductsListParams, IProductsStore } from "./types";

type PrivateFields = "_list" | "_meta" | "_length";

export default class ProductsStore implements IProductsStore, ILocalStore {
  private _list: CollectionModel<number, ProductItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _length: number = 0;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _length: observable.ref,
      list: computed,
      meta: computed,
      length: computed,
      getLength: action,
      getProductsList: action,
    });
  }

  get list(): ProductItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get length(): number {
    return this._length;
  }

  async getProductsList(params: GetProductsListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await rootStore.productApi.request<ProductItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: API_ENDPOINTS.PRODUCTS(params),
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: ProductItemModel[] = [];
        for (const item of response.data!) {
          list.push(normalizeProductItem(item));
        }

        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async getLength(params: GetProductsListParams): Promise<void> {
    this._meta = Meta.loading;
    this._length = 0;
    const response = await rootStore.productApi.request<ProductItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: API_ENDPOINTS.PRODUCTS(params),
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      this._length = response.data?.length || 0;
      this._meta = Meta.success;
    });
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.params,
    (params) => {
      setTimeout(() => this.getProductsList(params), 0);
    }
  );

  destroy(): void {
    this._qpReaction();
  }
}
