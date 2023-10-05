import { GetProductsListParams, PRODUCTS_PER_PAGE } from "store/ProductsStore";

export const API_URLS = {
  PRODUCTS: "https://kts-store-api.glitch.me/api/",
};

export const API_ENDPOINTS = {
  PRODUCTS: (params: GetProductsListParams) => {
    const { page = "", substring = "", include = "" } = params;
    return `/products/?offset=${
      (page ? parseInt(page) - 1 : 0) * PRODUCTS_PER_PAGE
    }&limit=${
      page ? PRODUCTS_PER_PAGE : ""
    }&substring=${substring}&include=${include}`;
  },
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  CATEGORIES: "/categories",
};
