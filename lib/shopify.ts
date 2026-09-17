import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !publicAccessToken) {
  throw new Error(
    "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local",
  );
}

const normalizedDomain = storeDomain
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

export const shopifyClient = createStorefrontApiClient({
  storeDomain: `https://${normalizedDomain}`,
  apiVersion: "2026-07",
  publicAccessToken,
});

const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        productType
        images(first: 5) {
          nodes {
            url
            altText
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
          }
        }
      }
    }
  }
`;

export async function getProducts(first = 10) {
  const { data, errors } = await shopifyClient.request(PRODUCTS_QUERY, {
    variables: { first },
  });

  if (errors) {
    throw new Error(errors.message ?? "Failed to fetch products from Shopify");
  }

  return data?.products.nodes ?? [];
}

export type ShopifyProduct = Awaited<ReturnType<typeof getProducts>>[number];

const PRODUCT_BY_HANDLE_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      images(first: 8) {
        nodes {
          url
          altText
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        nodes {
          id
          availableForSale
        }
      }
    }
  }
`;

export async function getProductByHandle(handle: string) {
  const { data, errors } = await shopifyClient.request(
    PRODUCT_BY_HANDLE_QUERY,
    { variables: { handle } },
  );

  if (errors) {
    throw new Error(errors.message ?? "Failed to fetch product from Shopify");
  }

  return data?.product ?? null;
}

export type ShopifyProductDetail = NonNullable<
  Awaited<ReturnType<typeof getProductByHandle>>
>;

export async function getRandomProducts(excludeId: string, count = 4) {
  const products = await getProducts(20);
  const candidates = products.filter(
    (product: ShopifyProduct) => product.id !== excludeId,
  );

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  return candidates.slice(0, count);
}
