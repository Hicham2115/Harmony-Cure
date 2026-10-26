"use client";

import { useEffect } from "react";
import {
  shopifyCartAnalyticsStore,
  trackCartAnalytics,
} from "@/lib/shopify-analytics";

export function CartAnalyticsTracker() {
  useEffect(() => {
    try {
      return trackCartAnalytics(shopifyCartAnalyticsStore);
    } catch (error) {
      console.error("Shopify cart analytics could not start:", error);
    }
  }, []);

  return null;
}
