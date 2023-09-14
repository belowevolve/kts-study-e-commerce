import { Product } from "config/Product.types";
import { ApiResponse, useFakeStoreApi } from "hooks/useApi";

const UseFetchProducts = (
  include?: string,
  substring?: string,
  offset = 0,
  limit?: number
): ApiResponse<Product[]> => {
  return useFakeStoreApi<Product[]>(
    `/products?include=${include}&substring=${substring}&offset=${offset}&limit=${limit}`
  );
};

export default UseFetchProducts;
