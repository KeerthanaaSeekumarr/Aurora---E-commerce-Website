export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  images: string[];
  specs: Record<string, string>;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  badge?: 'New' | 'Best Seller' | 'Sale' | 'Trending';
  featured?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // Combined product.id + color + size for uniqueness in cart
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}
