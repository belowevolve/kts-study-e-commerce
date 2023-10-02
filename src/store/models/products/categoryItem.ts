export type CategoryItemApi = {
  id: string;
  image: string;
  name: string;
};

export type CategoryItemModel = {
  id: string;
  image: string;
  name: string;
};

export const normalizeCategoryItem = (
  from: CategoryItemApi
): CategoryItemModel => ({
  id: from.id,
  image: from.image,
  name: from.name,
});
