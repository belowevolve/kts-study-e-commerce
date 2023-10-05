export type GetProductParams = {
  id: string;
};

export interface IProductStore {
  getProduct(params: GetProductParams): Promise<void>;
}
