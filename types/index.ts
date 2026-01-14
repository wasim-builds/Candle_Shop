export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // Additional images for gallery
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

// Admin Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number; // Price at time of order
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'customer';
  createdAt: Date;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueChange: number; // Percentage change from previous period
  ordersChange: number;
  lowStockProducts: number;
  pendingOrders: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

