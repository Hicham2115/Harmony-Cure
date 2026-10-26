import {
  AnalyticsEvent,
  EMPTY_CART_DATA,
  EMPTY_CART_STATE,
  trackCartAnalytics,
  type CartState,
  type StorefrontAnalytics,
} from "@shopify/hydrogen";
import { useCartStore } from "@/lib/store/use-cart";

export { AnalyticsEvent };

export function getShopifyAnalytics(): StorefrontAnalytics | null {
  if (typeof window === "undefined") return null;
  return window.Shopify?.analytics ?? null;
}

function getCartAnalyticsState(): CartState {
  const state = useCartStore.getState();
  return {
    ...EMPTY_CART_STATE,
    data: (state.cart ?? EMPTY_CART_DATA) as CartState["data"],
    loading: state.isLoading,
    pending: {
      ...EMPTY_CART_STATE.pending,
      cost: state.isLoading,
    },
  };
}

export const shopifyCartAnalyticsStore = {
  getState: getCartAnalyticsState,
  subscribe: (listener: (state: CartState) => void) =>
    useCartStore.subscribe(() => listener(getCartAnalyticsState())),
};

export { trackCartAnalytics };
