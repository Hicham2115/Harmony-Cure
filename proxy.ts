import {
  createShopifyRequestContext,
  createStorefrontClient,
  handleShopifyRoutes,
} from "@shopify/hydrogen";
import { NextResponse, type NextRequest } from "next/server";

const storeDomain =
  process.env.SHOPIFY_STOREFRONT_API_DOMAIN ??
  process.env.SHOPIFY_ADMIN_API_DOMAIN ??
  process.env.SHOPIFY_STORE_DOMAIN ??
  "3a33ba-c1.myshopify.com";

export async function proxy(request: NextRequest) {
  const requestContext = createShopifyRequestContext({
    request,
    i18n: { country: "FR", language: "FR" },
  });
  const storefrontClient = createStorefrontClient({
    type: "public",
    requestContext,
    config: {
      storeDomain: storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      publicStorefrontToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      apiVersion: "2026-10",
      storefrontId: "401383",
    },
  });

  const shopifyRoute = handleShopifyRoutes({
    request,
    requestContext,
    storefrontClient,
  });
  if (shopifyRoute) return shopifyRoute;

  const response = NextResponse.next();
  requestContext.applyResponseHeaders(response.headers);
  return response;
}

export const config = {
  matcher: ["/__shopify/:path*"],
};
