export interface IPaginationStore {
  goToPage(page: number): void;
  nextPage(): void;
  prevPage(): void;
}
