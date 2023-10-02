import { getInitialProductItemModel } from "store/models/products";
import {
  ProductItemApi,
  ProductItemModel,
  normalizeProductItem,
} from "./productItem";

export type CartItemApi = {
  quantity: number;
  product: ProductItemApi;
};

export type CartItemModel = {
  quantity: number;
  product: ProductItemModel;
};

export const normalizeCartItem = (from: CartItemApi): CartItemModel => ({
  quantity: from.quantity,
  product: normalizeProductItem(from.product),
});

export const getInitialCartItemModel = (): CartItemModel => ({
  quantity: 0,
  product: getInitialProductItemModel(),
});
