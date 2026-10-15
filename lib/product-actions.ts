"use server";

import { shopifyClient } from "@/lib/shopify";

const PRODUCTS_BY_IDS_QUERY = `#graphql
  query ProductsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        images(first: 1) {
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
          }
        }
      }
    }
  }
`;

export async function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];

  const { data, errors } = await shopifyClient.request(PRODUCTS_BY_IDS_QUERY, {
    variables: { ids },
  });

  if (errors) {
    throw new Error(errors.message ?? "Failed to fetch products from Shopify");
  }

  return (data?.nodes ?? []).filter(
    (node: unknown): node is NonNullable<typeof node> => Boolean(node),
  ) as {
    id: string;
    title: string;
    handle: string;
    images: { nodes: { url: string; altText: string | null }[] };
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    variants: { nodes: { id: string }[] };
  }[];
}
