import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define the interface for the store's state
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
}

// type State = {
//   user: User;
// };

// type Action = {
//   setUser: (user: User) => void;
// };

interface UserStore {
  user: User;
  accessToken?: string;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  clearUser: () => void;
  tokenExpired: boolean;
  setTokenExpired: (expired: boolean) => void;
}

// Create the store with the specified type
export const useUserStore = create(
  devtools<UserStore>((set, get, store) => ({
    user: { uid: "", email: "", role: "" },
    accessToken: "",
    tokenExpired: false,
    setUser: (user) => set(() => ({ user })),
    setAccessToken: (token) => set(() => ({ accessToken: token })),
    clearUser: () => set(store.getInitialState()),
    setTokenExpired: (expired) => set(() => ({ tokenExpired: expired })),
  }))
);

export const { setUser, setAccessToken, setTokenExpired, clearUser } =
  useUserStore.getState();
