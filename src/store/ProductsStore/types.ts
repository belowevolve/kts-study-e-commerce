export type GetProductsListParams = {
  page?: string;
  substring?: string;
  include?: string;
};

export interface IProductsStore {
  getProductsList(params: GetProductsListParams): Promise<void>;
  getLength(params: GetProductsListParams): Promise<void>;
}
