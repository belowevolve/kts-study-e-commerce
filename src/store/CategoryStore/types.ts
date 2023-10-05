export interface ICategoryStore {
  getCategoriesList(include?: string): Promise<void>;
}
