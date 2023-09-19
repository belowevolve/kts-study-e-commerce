import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";
import { PRODUCTS_URL } from "config/apiUrls";
import { Meta } from "config/globalEnums";
import ApiStore, { HTTPMethod } from "store/ApiStore";
import {
  CategoryItemApi,
  CategoryItemModel,
  normalizeCategoryItem,
} from "store/models/product";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import { ILocalStore } from "utils/useLocalStore";
import { ICategoryStore } from "./types";

type PrivateFields = "_list" | "_meta";

export default class CategoryStore implements ICategoryStore, ILocalStore {
  private readonly _apiStore = new ApiStore(PRODUCTS_URL);
  private _list: CollectionModel<string, CategoryItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      collectionList: computed,
      meta: computed,
      getCategoriesList: action,
    });
  }

  get list(): CategoryItemModel[] {
    return linearizeCollection(this._list);
  }

  get collectionList(): CollectionModel<string, CategoryItemModel> {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCategoriesList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this._apiStore.request<CategoryItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: "/categories",
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: CategoryItemModel[] = [];
        for (const item of response.data!) {
          list.push(normalizeCategoryItem(item));
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

  destroy(): void {}
}
