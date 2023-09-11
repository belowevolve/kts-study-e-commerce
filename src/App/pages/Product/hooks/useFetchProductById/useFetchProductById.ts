import { Product } from "config/Product.types";

import usePlatziFakeStoreApi, { ApiResponse } from "hooks/useApi";

const UseFetchProductById = (id: string): ApiResponse<Product> => {
  return usePlatziFakeStoreApi<Product>(`/products/${id}`);
};

export default UseFetchProductById;
