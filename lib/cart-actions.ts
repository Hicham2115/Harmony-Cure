"use server";

import { shopifyClient } from "@/lib/shopify";
import { assertVisitorCanOrder } from "@/lib/shipping-countries";

const CART_FRAGMENT = `#graphql
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
            }
            image {
              url
              altText
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

function normalizeCart(cart: unknown) {
  if (!cart) return null;
  return cart as {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: { subtotalAmount: { amount: string; currencyCode: string } };
    lines: {
      nodes: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string; handle: string };
          image: { url: string; altText: string | null } | null;
          price: { amount: string; currencyCode: string };
        };
      }[];
    };
  };
}

export type ShopifyCart = NonNullable<ReturnType<typeof normalizeCart>>;

export async function createCart(merchandiseId: string, quantity: number) {
  await assertVisitorCanOrder();

  const { data, errors } = await shopifyClient.request(
    `#graphql
      mutation CartCreate($lines: [CartLineInput!]!) @inContext(country: FR) {
        cartCreate(input: { lines: $lines }) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { variables: { lines: [{ merchandiseId, quantity }] } },
  );

  if (errors) throw new Error(errors.message ?? "Failed to create cart");
  const userErrors = data?.cartCreate?.userErrors;
  if (userErrors?.length) throw new Error(userErrors[0].message);

  return normalizeCart(data?.cartCreate?.cart);
}

export async function addCartLine(
  cartId: string,
  merchandiseId: string,
  quantity: number,
) {
  await assertVisitorCanOrder();

  const { data, errors } = await shopifyClient.request(
    `#graphql
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) @inContext(country: FR) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { variables: { cartId, lines: [{ merchandiseId, quantity }] } },
  );

  if (errors) throw new Error(errors.message ?? "Failed to add to cart");
  const userErrors = data?.cartLinesAdd?.userErrors;
  if (userErrors?.length) throw new Error(userErrors[0].message);

  return normalizeCart(data?.cartLinesAdd?.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
) {
  const { data, errors } = await shopifyClient.request(
    `#graphql
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) @inContext(country: FR) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { variables: { cartId, lines: [{ id: lineId, quantity }] } },
  );

  if (errors) throw new Error(errors.message ?? "Failed to update cart");
  const userErrors = data?.cartLinesUpdate?.userErrors;
  if (userErrors?.length) throw new Error(userErrors[0].message);

  return normalizeCart(data?.cartLinesUpdate?.cart);
}

export async function removeCartLine(cartId: string, lineId: string) {
  const { data, errors } = await shopifyClient.request(
    `#graphql
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) @inContext(country: FR) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { variables: { cartId, lineIds: [lineId] } },
  );

  if (errors) throw new Error(errors.message ?? "Failed to remove from cart");
  const userErrors = data?.cartLinesRemove?.userErrors;
  if (userErrors?.length) throw new Error(userErrors[0].message);

  return normalizeCart(data?.cartLinesRemove?.cart);
}

export async function fetchCart(cartId: string) {
  const { data, errors } = await shopifyClient.request(
    `#graphql
      query Cart($cartId: ID!) @inContext(country: FR) {
        cart(id: $cartId) { ...CartFields }
      }
      ${CART_FRAGMENT}
    `,
    { variables: { cartId } },
  );

  if (errors) throw new Error(errors.message ?? "Failed to fetch cart");

  return normalizeCart(data?.cart);
}
