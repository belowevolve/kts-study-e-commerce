export type ProductItemApi = {
  id: number;
  images: string[];
  category: string;
  title: string;
  description: string;
  price: number;
};

export type ProductItemModel = {
  id: number;
  images: string[];
  category: string;
  title: string;
  description: string;
  price: number;
};

export const normalizeProductItem = (
  from: ProductItemApi
): ProductItemModel => ({
  id: from.id,
  images: from.images,
  category: from.category,
  title: from.title,
  description: from.description,
  price: from.price,
});

export const getInitialProductItemModel = (): ProductItemModel => ({
  id: 0,
  images: [],
  category: "",
  title: "",
  description: "",
  price: 0,
});
