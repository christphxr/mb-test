export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Category {
  label: string;
  products: Product[];
}

export type CategoryApiResponse = Record<string, Category>;

export type CategoryKey = keyof CategoryApiResponse;
