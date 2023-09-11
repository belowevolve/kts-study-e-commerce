import { Product } from "config/Product.types";
import usePlatziFakeStoreApi, { ApiResponse } from "hooks/useApi";

const UseFetchProducts = (
  offset = 0,
  limit?: number
): ApiResponse<Product[]> => {
  return usePlatziFakeStoreApi<Product[]>(
    `/products?offset=${offset}&limit=${limit}`
  );
};

export default UseFetchProducts;
