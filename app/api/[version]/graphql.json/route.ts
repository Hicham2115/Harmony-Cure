import {
  createShopifyRequestContext,
  createStorefrontClient,
  handleShopifyRoutes,
} from "@shopify/hydrogen";

const API_VERSION = "2026-10";
const STORE_DOMAIN = "3a33ba-c1.myshopify.com";
const STOREFRONT_ID = "401383";

async function proxyShopifyRequest(request: Request) {
  const url = new URL(request.url);
  if (!/^\/api\/(?:unstable|2026-10)\/graphql\.json$/.test(url.pathname)) {
    return new Response("Not found", { status: 404 });
  }

  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) {
    return new Response("Storefront API is not configured", { status: 503 });
  }

  const requestContext = createShopifyRequestContext({
    request,
    i18n: { country: "FR", language: "FR" },
  });
  const storefrontClient = createStorefrontClient({
    type: "public",
    requestContext,
    config: {
      storeDomain: STORE_DOMAIN,
      publicStorefrontToken: token,
      apiVersion: API_VERSION,
      storefrontId: STOREFRONT_ID,
    },
  });
  const route = handleShopifyRoutes({ request, requestContext, storefrontClient });
  if (!route) return new Response("Not found", { status: 404 });

  const response = await route;
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store, max-age=0");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const GET = proxyShopifyRequest;
export const POST = proxyShopifyRequest;
export const OPTIONS = proxyShopifyRequest;
