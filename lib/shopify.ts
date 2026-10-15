import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain =
  process.env.SHOPIFY_STOREFRONT_API_DOMAIN ??
  process.env.SHOPIFY_ADMIN_API_DOMAIN ??
  process.env.SHOPIFY_STORE_DOMAIN;
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !publicAccessToken) {
  throw new Error(
    "Set SHOPIFY_ADMIN_API_DOMAIN (or SHOPIFY_STOREFRONT_API_DOMAIN) and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.",
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
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        id
        title
        handle
        description
        productType
        tags
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

type ProductPage = {
  products: {
    nodes: {
      id: string;
      title: string;
      handle: string;
      description: string;
      productType: string;
      tags: string[];
      images: { nodes: { url: string; altText: string | null }[] };
      priceRange: {
        minVariantPrice: { amount: string; currencyCode: string };
      };
      variants: { nodes: { id: string; availableForSale: boolean }[] };
    }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
};

export async function getProducts(limit?: number) {
  const products: ProductPage["products"]["nodes"] = [];
  let after: string | null = null;

  while (limit === undefined || products.length < limit) {
    const first = Math.min(limit ? limit - products.length : 250, 250);
    const response: { data?: ProductPage; errors?: { message?: string } } =
      await shopifyClient.request<ProductPage>(PRODUCTS_QUERY, {
        variables: { first, after },
      });

    if (response.errors) {
      throw new Error(
        response.errors.message ?? "Failed to fetch products from Shopify",
      );
    }

    const connection: ProductPage["products"] | undefined =
      response.data?.products;
    products.push(...(connection?.nodes ?? []));

    if (!connection?.pageInfo.hasNextPage || !connection.pageInfo.endCursor) {
      break;
    }

    after = connection.pageInfo.endCursor;
  }

  return products;
}

export type ShopifyProduct = Awaited<ReturnType<typeof getProducts>>[number];

const STOREFRONT_FILTERS_QUERY = `#graphql
  query StorefrontFilters {
    products(first: 1) {
      filters {
        id
        label
        type
        values {
          id
          label
          count
          input
        }
      }
    }
  }
`;

export type ShopifyStorefrontFilter = {
  id: string;
  label: string;
  type: "BOOLEAN" | "LIST" | "PRICE_RANGE";
  values: {
    id: string;
    label: string;
    count: number;
    input: unknown;
  }[];
};

export async function getStorefrontFilters(): Promise<ShopifyStorefrontFilter[]> {
  const { data, errors } = await shopifyClient.request(STOREFRONT_FILTERS_QUERY);

  if (errors) {
    throw new Error(errors.message ?? "Failed to fetch Shopify filters");
  }

  return (data?.products.filters ?? []) as ShopifyStorefrontFilter[];
}

const PRODUCT_BY_HANDLE_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      tags
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
