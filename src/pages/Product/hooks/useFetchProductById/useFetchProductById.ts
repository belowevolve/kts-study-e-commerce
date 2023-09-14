import { Product } from "config/Product.types";

import { ApiResponse, useFakeStoreApi } from "hooks/useApi";

const UseFetchProductById = (id: string): ApiResponse<Product> => {
  return useFakeStoreApi<Product>(`/products/${id}`);
};

export default UseFetchProductById;
