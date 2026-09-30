"use server";

import { shopifyAdminRequest } from "@/lib/shopify-admin";
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
