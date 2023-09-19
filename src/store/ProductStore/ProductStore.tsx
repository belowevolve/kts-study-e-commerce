import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
  IReactionDisposer,
  reaction,
} from "mobx";
import { PRODUCTS_URL } from "config/apiUrls";
import { Meta } from "config/globalEnums";
import ApiStore, { HTTPMethod } from "store/ApiStore";
import rootStore from "store/RootStore/instance";
import {
  ProductItemApi,
  ProductItemModel,
  getInitialProductItemModel,
  normalizeProductItem,
} from "store/models/product";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import { ILocalStore } from "utils/useLocalStore";
import { PRODUCTS_PER_PAGE } from "./config";
import { GetProductsListParams, IProductStore } from "./types";

type PrivateFields =
  | "_list"
  | "_meta"
  | "_product"
  | "_metaProduct"
  | "_length"
  | "_qpReaction";

export default class ProductStore implements IProductStore, ILocalStore {
  private readonly _apiStore = new ApiStore(PRODUCTS_URL);
  private _list: CollectionModel<number, ProductItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _product: ProductItemModel = getInitialProductItemModel();
  private _metaProduct: Meta = Meta.initial;
  private _length: number = 0;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _product: observable.ref,
      _metaProduct: observable,
      _length: observable.ref,
      _qpReaction: observable.ref,
      list: computed,
      meta: computed,
      product: computed,
      metaProduct: computed,
      length: computed,
      getLength: action,
      getProduct: action,
      getProductsList: action,
    });
  }

  get list(): ProductItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get product(): ProductItemModel {
    return this._product;
  }

  get metaProduct(): Meta {
    return this._metaProduct;
  }

  get length(): number {
    return this._length;
  }

  async getProductsList(params: GetProductsListParams): Promise<void> {
    const { page, substring = "", include = "" } = params;
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this._apiStore.request<ProductItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/products/?offset=${
        (page ? parseInt(page) - 1 : 0) * PRODUCTS_PER_PAGE
      }&limit=${
        page ? PRODUCTS_PER_PAGE : 0
      }&substring=${substring}&include=${include}`,
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

  async getProduct(id: string): Promise<void> {
    this._metaProduct = Meta.loading;
    this._product = getInitialProductItemModel();
    const response = await this._apiStore.request<ProductItemApi>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/products/${id}`,
    });
    runInAction(() => {
      if (!response.success) {
        this._metaProduct = Meta.error;
      }

      try {
        this._product = normalizeProductItem(response.data!);
        this._metaProduct = Meta.success;
        return;
      } catch (e) {
        this._metaProduct = Meta.error;
        this._product = getInitialProductItemModel();
      }
    });
  }

  async getLength(params: GetProductsListParams): Promise<void> {
    const { substring, include } = params;
    this._meta = Meta.loading;
    this._length = 0;
    const response = await this._apiStore.request<ProductItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/products?substring=${substring}&include=${include}`,
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._length = response.data!.length;
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._length = 0;
      }
    });
  }

  destroy(): void {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.params,
    (params) => {
      this.getProductsList(params);
    }
  );
}
