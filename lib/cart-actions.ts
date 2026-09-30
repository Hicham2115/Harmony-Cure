"use server";

import { shopifyClient } from "@/lib/shopify";
import { assertVisitorCanOrder } from "@/lib/shipping-countries";
import { z } from "zod";

const promoCodeSchema = z
  .string()
  .trim()
  .min(1, "Saisissez un code promo.")
  .max(64, "Code promo invalide.")
  .regex(/^[A-Za-z0-9_-]+$/, "Code promo invalide.");

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
      totalAmount {
        amount
        currencyCode
      }
    }
    discountCodes {
      code
      applicable
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        attributes {
          key
          value
        }
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
    cost: {
      subtotalAmount: { amount: string; currencyCode: string };
      totalAmount: { amount: string; currencyCode: string };
    };
    discountCodes: { code: string; applicable: boolean }[];
    lines: {
      nodes: {
        id: string;
        quantity: number;
        attributes: { key: string; value: string }[];
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

export async function createCart(
  merchandiseId: string,
  quantity: number,
  selectedUnitPrice?: number,
  selectedTierTotal?: number,
) {
  await assertVisitorCanOrder();

  const attributes = selectedUnitPrice === undefined || selectedTierTotal === undefined
    ? []
    : [
        { key: "selected-unit-price", value: selectedUnitPrice.toFixed(2) },
        { key: "selected-tier-total", value: selectedTierTotal.toFixed(2) },
        { key: "selected-tier-quantity", value: String(quantity) },
      ];

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
    { variables: { lines: [{ merchandiseId, quantity, attributes }] } },
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
  selectedUnitPrice?: number,
  selectedTierTotal?: number,
) {
  await assertVisitorCanOrder();

  const attributes = selectedUnitPrice === undefined || selectedTierTotal === undefined
    ? []
    : [
        { key: "selected-unit-price", value: selectedUnitPrice.toFixed(2) },
        { key: "selected-tier-total", value: selectedTierTotal.toFixed(2) },
        { key: "selected-tier-quantity", value: String(quantity) },
      ];

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
    { variables: { cartId, lines: [{ merchandiseId, quantity, attributes }] } },
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
  selectedUnitPrice?: number,
  selectedTierTotal?: number,
) {
  const attributes = selectedUnitPrice === undefined || selectedTierTotal === undefined
    ? undefined
    : [
        { key: "selected-unit-price", value: selectedUnitPrice.toFixed(2) },
        { key: "selected-tier-total", value: selectedTierTotal.toFixed(2) },
        { key: "selected-tier-quantity", value: String(quantity) },
      ];

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
    { variables: { cartId, lines: [{ id: lineId, quantity, attributes }] } },
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

export async function applyCartDiscount(cartId: string, discountCode: string) {
  await assertVisitorCanOrder();

  const parsedCode = promoCodeSchema.safeParse(discountCode);
  if (!parsedCode.success) {
    throw new Error(parsedCode.error.issues[0]?.message ?? "Code promo invalide.");
  }

  const { data, errors } = await shopifyClient.request(
    `#graphql
      mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) @inContext(country: FR) {
        cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { variables: { cartId, discountCodes: [parsedCode.data] } },
  );

  if (errors) throw new Error(errors.message ?? "Impossible d'appliquer le code promo.");
  const userErrors = data?.cartDiscountCodesUpdate?.userErrors;
  if (userErrors?.length) throw new Error(userErrors[0].message);

  return normalizeCart(data?.cartDiscountCodesUpdate?.cart);
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
