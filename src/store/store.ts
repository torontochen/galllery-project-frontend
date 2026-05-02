import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { type Artist, type Art, type User } from "../types";

// Define the interface for the store's state

interface ArtistStore {
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
}

interface ArtStore {
  arts: Art[];
  filteredArts: Art[];
  setArts: (arts: Art[]) => void;
  setFilteredArts: (filteredArts: Art[]) => void;
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
  isProcessingOrder: boolean;
  accessToken?: string;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setIsInitializing: (initializing: boolean) => void;
  setIsProcessingOrder: (processing: boolean) => void;
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
      isProcessingOrder: false,
      tokenExpired: false,
      setIsInitializing: (initializing) =>
        set(() => ({ isInitializing: initializing })),
      setIsProcessingOrder: (processing) =>
        set(() => ({ isProcessingOrder: processing })),
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
      filteredArts: [],
      setArts: (arts) => set(() => ({ arts })),
      setFilteredArts: (filteredArts) => set(() => ({ filteredArts })),
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
