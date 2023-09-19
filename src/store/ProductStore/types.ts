export type GetProductsListParams = {
  page?: string;
  substring?: string;
  include?: string;
};

export interface IProductStore {
  getProductsList(params: GetProductsListParams): Promise<void>;
  getProduct(id: string): Promise<void>;
  getLength(params: GetProductsListParams): Promise<void>;
}
