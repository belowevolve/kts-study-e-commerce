import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";
import { Option } from "components/MultiDropdown";
import { API_ENDPOINTS } from "config/api";
import { Meta, HTTPMethod } from "config/globalEnums";

import rootStore from "store/RootStore/instance";
import {
  CategoryItemApi,
  CategoryItemModel,
  normalizeCategoryItem,
} from "store/models/products";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import { ILocalStore } from "utils/useLocalStore";
import { ICategoryStore } from "./types";

type PrivateFields = "_list" | "_included" | "_meta";

export default class CategoryStore implements ICategoryStore, ILocalStore {
  private _list: CollectionModel<string, CategoryItemModel> =
    getInitialCollectionModel();
  private _included: Option[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _list: observable.ref,
      _included: observable,
      _meta: observable,
      list: computed,
      options: computed,
      included: computed,
      includedIds: computed,
      meta: computed,
      getCategoriesList: action,
      setIncluded: action.bound,
    });
  }

  get list(): CategoryItemModel[] {
    return linearizeCollection(this._list);
  }

  get options(): Option[] {
    return this._list.order.map((id) => ({
      key: id,
      value: this._list.entities[id].name,
    }));
  }

  get included(): Option[] {
    return this._included;
  }

  get includedIds(): string {
    return this._included.reduce(
      (query, category) => query + String(category.key) + "|",
      ""
    );
  }

  setIncluded(value: Option[]) {
    this._included = value;
  }

  includedOptions(include: string): Option[] {
    return include
      .split("|")
      .filter((id) => id.trim() !== "")
      .map((el) => ({
        key: el,
        value: this._list.entities[el].name,
      }));
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCategoriesList(include = ""): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    this._included = [];
    const includedIds = include.split("|").filter((id) => id.trim() !== "");

    const response = await rootStore.productApi.request<CategoryItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: API_ENDPOINTS.CATEGORIES,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: CategoryItemModel[] = [];
        const included: Option[] = [];
        for (const item of response.data!) {
          if (includedIds.includes(String(item.id))) {
            included.push({ key: String(item.id), value: item.name });
          }
          list.push(normalizeCategoryItem(item));
        }

        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        this._included = included;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
        this._included = [];
      }
    });
  }

  destroy(): void {}
}
