export type GetProductParams = {
  id: string;
};

export interface IProductStore {
  getProduct(id: string): Promise<void>;
}
