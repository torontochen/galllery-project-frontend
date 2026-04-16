import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

// Define the interface for the store's state
interface ShoppingCartItem {
  art_id: string;
  quantity: number;
  description: string;
  added_at: string;
  price: number;
  artist: string;
  image_url: string;
}

interface ShoppingCart {
  user_id: string;
  arts: ShoppingCartItem[];
  added_date: string;
}

interface User {
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

interface Art {
  uid: string;
  title: string;
  description: string;
  creation_date: string;
  price: number;
  status: string;
  image_url: string;
  transaction_id: string;
  artist: User;
}

interface Artist {
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

interface ArtistStore {
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
}

interface ArtStore {
  arts: Art[];
  setArts: (arts: Art[]) => void;
}

// type State = {
//   user: User;
// };

// type Action = {
//   setUser: (user: User) => void;
// };

interface UserStore {
  user: User;
  isInitializing: boolean;
  accessToken?: string;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setIsInitializing: (initializing: boolean) => void;
  clearUser: () => void;
  tokenExpired: boolean;
  setTokenExpired: (expired: boolean) => void;
}

// Create the store with the specified type
export const useUserStore = create(
  devtools<UserStore>(
    (set, get, store) => ({
      user: { uid: "", email: "", role: "" },
      accessToken: "",
      isInitializing: false,
      tokenExpired: false,
      setIsInitializing: (initializing) =>
        set(() => ({ isInitializing: initializing })),
      setUser: (user) => set(() => ({ user })),
      setAccessToken: (token) => set(() => ({ accessToken: token })),
      clearUser: () => set(store.getInitialState()),
      setTokenExpired: (expired) => set(() => ({ tokenExpired: expired })),
    }),
    { name: "UserStore" }
  )
);

export const useArtStore = create(
  devtools<ArtStore>(
    (set, get, store) => ({
      arts: [],
      setArts: (arts) => set(() => ({ arts })),
    }),
    { name: "ArtStore" }
  )
);

export const useArtistStore = create(
  devtools<ArtistStore>(
    (set, get, store) => ({
      artists: [],
      setArtists: (artists) => set(() => ({ artists })),
    }),
    { name: "ArtistStore" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("ArtStore", useArtStore);
  mountStoreDevtool("ArtistStore", useArtistStore);
  mountStoreDevtool("UserStore", useUserStore);
}

export const {
  setUser,
  setAccessToken,
  setTokenExpired,
  clearUser,
  accessToken,
} = useUserStore.getState();
