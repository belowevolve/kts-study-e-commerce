import { PRODUCTS_URL } from "config/apiUrls";
import ApiStore from "./ApiStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly productApi = new ApiStore(PRODUCTS_URL);
}
