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

function hasValidLines(cart: ShopifyCart | null): cart is ShopifyCart {
  return !!cart && cart.lines.nodes.some((line) => line.quantity > 0);
}

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
          set(hasValidLines(cart) ? { cart } : { cart: null, cartId: null });
        } catch (error) {
          console.error("Failed to load cart, resetting it:", error);
          set({ cart: null, cartId: null });
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (merchandiseId, quantity = 1) => {
        set({ isLoading: true });
        try {
          const { cartId } = get();
          let cart: ShopifyCart | null = null;
          try {
            cart = cartId
              ? await addCartLine(cartId, merchandiseId, quantity)
              : await createCart(merchandiseId, quantity);
          } catch (error) {
            if (!cartId) throw error;
            // Existing cart is stale or invalid — start a fresh one.
            console.error("Cart was invalid, starting a new one:", error);
            cart = await createCart(merchandiseId, quantity);
          }

          if (cartId && !hasValidLines(cart)) {
            // The existing cart silently failed to add the line — retry fresh.
            cart = await createCart(merchandiseId, quantity);
          }

          set({ cart, cartId: cart?.id ?? null, isOpen: true });
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (lineId, quantity) => {
        if (quantity < 1) {
          await get().removeItem(lineId);
          return;
        }
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const cart = await updateCartLine(cartId, lineId, quantity);
          set({ cart });
        } catch (error) {
          console.error("Failed to update cart, resetting it:", error);
          set({ cart: null, cartId: null });
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
        } catch (error) {
          console.error("Failed to update cart, resetting it:", error);
          set({ cart: null, cartId: null });
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
