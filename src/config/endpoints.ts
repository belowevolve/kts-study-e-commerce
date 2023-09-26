import { GetProductsListParams, PRODUCTS_PER_PAGE } from "store/ProductsStore";

export const PRODUCTS_ENDPOINT = (params: GetProductsListParams) => {
  const { page = "", substring = "", include = "" } = params;
  return `/products/?offset=${
    (page ? parseInt(page) - 1 : 0) * PRODUCTS_PER_PAGE
  }&limit=${
    page ? PRODUCTS_PER_PAGE : ""
  }&substring=${substring}&include=${include}`;
};

export const PRODUCT_BY_ID_ENDPOINT = (id: string) => `/products/${id}`;

export const CATEGORIES_ENDPOINT = "/categories";
