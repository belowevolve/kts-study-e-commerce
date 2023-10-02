import { ProductItemModel } from "store/models/products";

export type GetCartList = {
  ids: string[];
};

export interface ICartStore {
  itemQuantity(id: number): number;
  cartIncludeItem(id: number): boolean;
  setQuantity(id: number, newQuantity: number): void;
  incQuantity(id: number): void;
  decQuantity(id: number): void;
  addToCart(product: ProductItemModel): void;
  buyNow(product: ProductItemModel): void;
  removeFromCart(productId: number): void;
}
