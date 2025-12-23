export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  collections: string[];
  variants?: ProductVariant[];
  inStock: boolean;
  stockCount?: number;
  soldCount?: number;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

