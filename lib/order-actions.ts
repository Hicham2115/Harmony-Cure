"use server";

import { shopifyAdminRequest } from "@/lib/shopify-admin";
import { fetchCart } from "@/lib/cart-actions";
import { codOrderSchema } from "@/lib/schemas/cod-order";
import { assertVisitorCanOrder } from "@/lib/shipping-countries";

const COD_TOTALS_BY_HANDLE = {
  "anti-chute-de-cheveux": {
    1: 37.99,
    2: 73.98,
    3: 107.97,
    4: 139.96,
  },
  "bruleur-de-graisses-naturel": {
    1: 39.9,
    2: 77.8,
    3: 113.7,
    4: 147.6,
  },
  "collagene-marin": {
    1: 35.99,
    2: 69.98,
    3: 103.97,
    4: 131.96,
  },
  "coupe-faim-naturel": {
    1: 29.99,
    2: 57.98,
    3: 83.97,
    4: 107.96,
  },
  "pack-harmony-love-collagene-marin-anti-chute-vegan": {
    1: 72.99,
    2: 146,
    3: 216,
    4: 284,
  },
  "pack-perte-de-poids": {
    1: 68.99,
    2: 129.98,
    3: 196.97,
    4: 257.96,
  },
  "pack-perte-de-poids-1-mois": {
    1: 129.99,
    2: 257.98,
    3: 383.97,
    4: 507.96,
  },
} as const;

const TIER_TOTALS_BY_HANDLE: Record<string, number[]> = {
  "anti-chute-de-cheveux": [37.99, 73.98, 107.97, 139.96],
  "bruleur-de-graisses-naturel": [39.9, 77.8, 113.7, 147.6],
  "collagene-marin": [35.99, 69.98, 103.97, 131.96],
  "coupe-faim-naturel": [29.99, 57.98, 83.97, 107.96],
  "pack-harmony-love-collagene-marin-anti-chute-vegan": [72.99, 146, 216, 284],
  "pack-perte-de-poids": [68.99, 129.98, 196.97, 257.96],
  "pack-perte-de-poids-1-mois": [129.99, 257.98, 383.97, 507.96],
};

function getSelectedTierTotal(
  handle: string,
  quantity: number,
  baseUnitPrice: number,
  attributes: { key: string; value: string }[],
) {
  const unitPriceAttribute = attributes.find(
    (attribute) => attribute.key === "selected-unit-price",
  );
  if (!unitPriceAttribute) return null;
  const selectedUnitPrice = Number(unitPriceAttribute.value);
  if (!Number.isFinite(selectedUnitPrice) || selectedUnitPrice <= 0) {
    throw new Error("Le prix du pack sélectionné n'est pas valide.");
  }

  const selectedQuantity = Number(
    attributes.find((attribute) => attribute.key === "selected-tier-quantity")?.value,
  );
  const selectedTotal = Number(
    attributes.find((attribute) => attribute.key === "selected-tier-total")?.value,
  );
  const tierTotals = TIER_TOTALS_BY_HANDLE[handle] ?? [
    baseUnitPrice,
    baseUnitPrice * 2 * 0.95,
    baseUnitPrice * 3 * 0.9,
    baseUnitPrice * 4 * 0.85,
  ];
  const expectedTierTotal = tierTotals[selectedQuantity - 1];
  const validUnitPrices = tierTotals.map((total, index) =>
    Math.round((total / (index + 1)) * 100),
  );
  if (
    !validUnitPrices.includes(Math.round(selectedUnitPrice * 100))
  ) {
    throw new Error("Le prix du pack sélectionné n'est plus valide.");
  }

  if (
    quantity === selectedQuantity &&
    expectedTierTotal !== undefined &&
    Math.round(expectedTierTotal * 100) === Math.round(selectedTotal * 100)
  ) {
    return expectedTierTotal;
  }

  return Math.round(selectedUnitPrice * quantity * 100) / 100;
}

export async function createTierCheckout(cartId: string) {
  await assertVisitorCanOrder();

  if (!cartId.startsWith("gid://shopify/Cart/") || cartId.length > 512) {
    throw new Error("Panier invalide.");
  }

  const cart = await fetchCart(cartId);
  if (!cart || cart.lines.nodes.length === 0) {
    throw new Error("Votre panier est vide.");
  }

  const lineItems = cart.lines.nodes.map((line) => {
    const baseUnitPrice = Number(line.merchandise.price.amount);
    const selectedTotal = getSelectedTierTotal(
      line.merchandise.product.handle,
      line.quantity,
      baseUnitPrice,
      line.attributes,
    );
    if (selectedTotal === null) {
      return { variantId: line.merchandise.id, quantity: line.quantity };
    }

    const baseTotal = baseUnitPrice * line.quantity;
    if (selectedTotal < baseTotal) {
      return {
        variantId: line.merchandise.id,
        quantity: line.quantity,
        appliedDiscount: {
          title: "Prix du pack sélectionné",
          value: Number((baseUnitPrice - selectedTotal / line.quantity).toFixed(4)),
          valueType: "FIXED_AMOUNT",
        },
      };
    }

    return {
      variantId: line.merchandise.id,
      quantity: line.quantity,
      priceOverride: {
        amount: (selectedTotal / line.quantity).toFixed(2),
        currencyCode: line.merchandise.price.currencyCode,
      },
    };
  });

  const { data, errors } = await shopifyAdminRequest<{
    draftOrderCreate: {
      draftOrder: { invoiceUrl: string | null } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `#graphql
      mutation CreateTierCheckout($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder { invoiceUrl }
          userErrors { field message }
        }
      }
    `,
    {
      input: {
        lineItems,
        discountCodes: cart.discountCodes
          .filter((discount) => discount.applicable)
          .map((discount) => discount.code),
        allowDiscountCodesInCheckout: true,
        note: "Commande via Harmony Cure — prix du pack sélectionné",
      },
    },
  );

  if (errors) throw new Error("Erreur Shopify lors de la création du paiement.");
  const userErrors = data?.draftOrderCreate.userErrors;
  if (userErrors?.length) throw new Error(userErrors[0].message);

  const invoiceUrl = data?.draftOrderCreate.draftOrder?.invoiceUrl;
  if (!invoiceUrl) throw new Error("Shopify n'a pas fourni le lien de paiement.");
  return invoiceUrl;
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? fullName;
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

async function getCodUnitPrice(variantId: string, quantity: number) {
  const { data, errors } = await shopifyAdminRequest<{
    productVariant: { product: { handle: string } } | null;
  }>(
    `#graphql
      query ProductVariantForCodPrice($id: ID!) {
        productVariant(id: $id) {
          product { handle }
        }
      }
    `,
    { id: variantId },
  );

  const handle = data?.productVariant?.product.handle;
  const totals = handle
    ? COD_TOTALS_BY_HANDLE[handle as keyof typeof COD_TOTALS_BY_HANDLE]
    : undefined;

  if (errors || !totals) {
    return undefined;
  }

  const total = totals[quantity as keyof typeof totals];
  return total ? (total / quantity).toFixed(2) : undefined;
}

export async function createCodOrder(input: {
  variantId: string;
  quantity: number;
  fullName: string;
  phone: string;
  address: string;
}) {
  await assertVisitorCanOrder();

  const parsed = codOrderSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Champs invalides.");
  }

  const { firstName, lastName } = splitName(parsed.data.fullName);
  const originalUnitPrice = await getCodUnitPrice(
    input.variantId,
    input.quantity,
  );

  const { data, errors } = await shopifyAdminRequest<{
    draftOrderCreate: {
      draftOrder: { id: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `#graphql
      mutation DraftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder { id }
          userErrors { field message }
        }
      }
    `,
    {
      input: {
        lineItems: [
          {
            variantId: input.variantId,
            quantity: input.quantity,
            ...(originalUnitPrice ? { originalUnitPrice } : {}),
          },
        ],
        shippingAddress: {
          firstName,
          lastName,
          address1: parsed.data.address,
          phone: parsed.data.phone,
          country: "Morocco",
        },
        note: "Commande Paiement à la livraison (COD) — site web",
        tags: ["COD"],
      },
    },
  );

  if (errors) {
    throw new Error("Erreur Shopify lors de la création de la commande.");
  }

  const createErrors = data?.draftOrderCreate.userErrors;
  if (createErrors?.length) {
    throw new Error(createErrors[0].message);
  }

  const draftOrderId = data?.draftOrderCreate.draftOrder?.id;
  if (!draftOrderId) {
    throw new Error("Impossible de créer la commande.");
  }

  const { data: completeData, errors: completeErrors } =
    await shopifyAdminRequest<{
      draftOrderComplete: {
        draftOrder: { order: { id: string; name: string } | null } | null;
        userErrors: { field: string[]; message: string }[];
      };
    }>(
      `#graphql
        mutation DraftOrderComplete($id: ID!) {
          draftOrderComplete(id: $id, paymentPending: true) {
            draftOrder {
              order { id name }
            }
            userErrors { field message }
          }
        }
      `,
      { id: draftOrderId },
    );

  if (completeErrors) {
    throw new Error("Erreur Shopify lors de la confirmation de la commande.");
  }

  const completeUserErrors = completeData?.draftOrderComplete.userErrors;
  if (completeUserErrors?.length) {
    throw new Error(completeUserErrors[0].message);
  }

  const order = completeData?.draftOrderComplete.draftOrder?.order;
  if (!order) {
    throw new Error("La commande n'a pas pu être confirmée.");
  }

  return order;
}
