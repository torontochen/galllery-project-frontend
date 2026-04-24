export interface ShoppingCartItem {
  art_id: string;
  quantity: number;
  description: string;
  added_at: string;
  price: number;
  artist: string;
  image_url: string;
  title: string;
}

export interface ShoppingCart {
  user_id: string;
  arts: ShoppingCartItem[];
  added_date: string;
}

export interface User {
  uid: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_verified?: boolean;
  role: string;
  bio?: string;
  country?: string;
  address?: string;
  delivery_address?: string;
  phone_number?: string;
  shopping_cart?: ShoppingCart;
}

export interface Art {
  uid: string;
  title: string;
  description: string;
  creation_date: string;
  price: number;
  status: string;
  genres: string;
  medium: string;
  image_url: string;
  transaction_id: string;
  artist: User;
}

export interface Artist {
  uid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  bio: string;
  country?: string;
  address?: string;
  delivery_address?: string;
  phone_number?: string;
  avatar_url?: string;
}
