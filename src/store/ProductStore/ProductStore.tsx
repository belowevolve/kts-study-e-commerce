import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";

import { PRODUCT_BY_ID_ENDPOINT } from "config/endpoints";
import { Meta, HTTPMethod } from "config/globalEnums";

import rootStore from "store/RootStore/instance";
import {
  ProductItemApi,
  ProductItemModel,
  getInitialProductItemModel,
  normalizeProductItem,
} from "store/models/product";
import { ILocalStore } from "utils/useLocalStore";
import { IProductStore } from "./types";

type PrivateFields = "_product" | "_meta";

export default class ProductStore implements IProductStore, ILocalStore {
  private _product: ProductItemModel = getInitialProductItemModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _meta: observable,
      _product: observable.ref,
      meta: computed,
      product: computed,
      getProduct: action,
    });
  }

  get product(): ProductItemModel {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProduct(id: string): Promise<void> {
    this._meta = Meta.loading;
    this._product = getInitialProductItemModel();
    const response = await rootStore.productApi.request<ProductItemApi>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: PRODUCT_BY_ID_ENDPOINT(id),
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._product = normalizeProductItem(response.data!);
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._product = getInitialProductItemModel();
      }
    });
  }

  destroy(): void {}
}
