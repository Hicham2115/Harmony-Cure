"use client";

import { ShopifyScripts } from "@shopify/hydrogen/react";

const shop = {
  shopId: "gid://shopify/Shop/84007387402",
  storefrontId: "401383",
  myshopifyDomain: "3a33ba-c1.myshopify.com",
};

export function ShopifyAnalytics() {
  return (
    <ShopifyScripts
      shop={shop}
      i18n={{ country: "FR", language: "FR", currency: "EUR" }}
      consent={{ mode: "default-banner" }}
      analytics={{ channel: "headless" }}
    />
  );
}
