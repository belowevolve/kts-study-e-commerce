import { Category } from "config/Category.types";
import { ApiResponse, useFakeStoreApi } from "hooks/useApi";

const UseFetchCategories = (): ApiResponse<Category[]> => {
  return useFakeStoreApi<Category[]>(`/categories`);
};

export default UseFetchCategories;
