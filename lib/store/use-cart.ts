"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  addCartLine,
  createCart,
  fetchCart,
  removeCartLine,
  updateCartLine,
  type ShopifyCart,
} from "@/lib/cart-actions";

type CartState = {
  cartId: string | null;
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  hydrate: () => Promise<void>;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      isOpen: false,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      hydrate: async () => {
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const cart = await fetchCart(cartId);
          set(cart ? { cart } : { cart: null, cartId: null });
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (merchandiseId, quantity = 1) => {
        set({ isLoading: true });
        try {
          const { cartId } = get();
          const cart = cartId
            ? await addCartLine(cartId, merchandiseId, quantity)
            : await createCart(merchandiseId, quantity);
          set({ cart, cartId: cart?.id ?? null, isOpen: true });
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (lineId, quantity) => {
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const cart = await updateCartLine(cartId, lineId, quantity);
          set({ cart });
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId) => {
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const cart = await removeCartLine(cartId, lineId);
          set({ cart });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "harmony-cure-cart",
      partialize: (state) => ({ cartId: state.cartId }),
    },
  ),
);
