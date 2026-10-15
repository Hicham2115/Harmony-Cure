import type { ShopifyProduct } from "@/lib/shopify";

export function formatPrice(product: ShopifyProduct) {
  const { amount, currencyCode } = product.priceRange.minVariantPrice;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}
