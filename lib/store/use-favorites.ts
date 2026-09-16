"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
  favoriteIds: string[];
  isOpen: boolean;
  toggleFavorite: (id: string) => void;
  openFavorites: () => void;
  closeFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      isOpen: false,
      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...state.favoriteIds, id],
        })),
      openFavorites: () => set({ isOpen: true }),
      closeFavorites: () => set({ isOpen: false }),
    }),
    {
      name: "harmony-cure-favorites",
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    },
  ),
);
