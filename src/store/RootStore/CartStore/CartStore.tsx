import {
  makeObservable,
  observable,
  computed,
  action,
  set,
  runInAction,
  remove,
} from "mobx";
import { API_ENDPOINTS } from "config/api";
import { HTTPMethod, Meta } from "config/globalEnums";
import ApiStore from "store/RootStore/ApiStore";
import {
  ProductItemApi,
  ProductItemModel,
  normalizeProductItem,
  CartItemModel,
} from "store/models/products";

import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
} from "store/models/shared/collection";
import { ICartStore } from "./types";

type PrivateFields = "_cartItems" | "_meta";

export default class CartStore implements ICartStore {
  private _productApi: ApiStore;
  private _meta: Meta = Meta.initial;
  private _cartItems: CollectionModel<number, CartItemModel> =
    getInitialCollectionModel();

  constructor(productApi: ApiStore) {
    makeObservable<CartStore, PrivateFields>(this, {
      _meta: observable,
      _cartItems: observable,
      cartItems: computed,
      meta: computed,
      totalItems: computed,
      totalPrice: computed,
      setQuantity: action,
      incQuantity: action,
      decQuantity: action,
      buyNow: action,
      addToCart: action,
      removeFromCart: action,
    });

    this._productApi = productApi;
    this.loadCartFromLocalStorage();
  }

  get totalItems(): number {
    return this._cartItems.order.reduce(
      (total, id) => total + this._cartItems.entities[id].quantity,
      0
    );
  }

  get totalPrice(): number {
    return this._cartItems.order.reduce(
      (total, id) =>
        total +
        this._cartItems.entities[id].product.price *
          this._cartItems.entities[id].quantity,
      0
    );
  }

  get cartItems(): CartItemModel[] {
    return linearizeCollection(this._cartItems);
  }

  get meta(): Meta {
    return this._meta;
  }

  itemQuantity(id: number): number {
    return this._cartItems.entities[id]?.quantity || 0;
  }

  cartIncludeItem(id: number): boolean {
    return this._cartItems.order.includes(id);
  }

  setQuantity(id: number, newQuantity: number): void {
    set(this._cartItems.entities[id], "quantity", newQuantity);
    this.saveCartToLocalStorage();
  }

  incQuantity(id: number): void {
    set(
      this._cartItems.entities[id],
      "quantity",
      this._cartItems.entities[id].quantity + 1
    );
    this.saveCartToLocalStorage();
  }

  decQuantity(id: number): void {
    if (this._cartItems.entities[id].quantity === 1) {
      this.removeFromCart(id);
      return;
    }

    set(
      this._cartItems.entities[id],
      "quantity",
      this._cartItems.entities[id].quantity - 1
    );
    this.saveCartToLocalStorage();
  }

  addToCart(product: ProductItemModel): void {
    const existingId = this._cartItems.order.find((id) => id === product.id);
    if (existingId) {
      set(
        this._cartItems.entities[existingId],
        "quantity",
        this._cartItems.entities[existingId].quantity + 1
      );
    } else {
      this._cartItems.order.push(product.id);
      const newItem = { quantity: 1, product };
      set(this._cartItems.entities, product.id.toString(), newItem);
    }

    this.saveCartToLocalStorage();
  }

  buyNow(product: ProductItemModel): void {
    if (!this.cartIncludeItem(product.id)) {
      this._cartItems.order.push(product.id);
      const newItem = { quantity: 1, product };
      set(this._cartItems.entities, product.id.toString(), newItem);
      this.saveCartToLocalStorage();
    }
  }

  removeFromCart(productId: number): void {
    this._cartItems.order = this._cartItems.order.filter(
      (id) => id !== productId
    );
    remove(this._cartItems.entities, productId.toString());
    this.saveCartToLocalStorage();
  }

  private async loadCartFromLocalStorage(): Promise<void> {
    this._meta = Meta.loading;
    const cartItems: CollectionModel<number, CartItemModel> = JSON.parse(
      localStorage.getItem("cartItems") ||
        JSON.stringify(getInitialCollectionModel())
    );

    try {
      await Promise.all(
        cartItems.order.map(async (id) => {
          const response = await this._productApi.request<ProductItemApi>({
            method: HTTPMethod.GET,
            endpoint: API_ENDPOINTS.PRODUCT_BY_ID(id.toString()),
          });
          if (response.success) {
            cartItems.entities[id].product = normalizeProductItem(
              response.data!
            );
          }
        })
      );

      runInAction(() => {
        this._cartItems = cartItems;
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  private saveCartToLocalStorage(): void {
    const cartItems: CollectionModel<number, { quantity: number }> = {
      order: this._cartItems.order,
      entities: {},
    };

    this._cartItems.order.forEach((id) => {
      cartItems.entities[id] = {
        quantity: this._cartItems.entities[id].quantity,
      };
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  destroy(): void {}
}
