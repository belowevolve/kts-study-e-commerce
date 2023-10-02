import { API_URLS } from "config/api";
import ApiStore from "./ApiStore";
import CartStore from "./CartStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly productApi = new ApiStore(API_URLS.PRODUCTS);
  readonly cartStore = new CartStore(this.productApi);
  readonly query = new QueryParamsStore();
}
