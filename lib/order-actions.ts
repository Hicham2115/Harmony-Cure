"use server";

import { shopifyAdminRequest } from "@/lib/shopify-admin";
import { codOrderSchema } from "@/lib/schemas/cod-order";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? fullName;
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

export async function createCodOrder(input: {
  variantId: string;
  quantity: number;
  fullName: string;
  phone: string;
  address: string;
}) {
  const parsed = codOrderSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Champs invalides.");
  }

  const { firstName, lastName } = splitName(parsed.data.fullName);

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
        lineItems: [{ variantId: input.variantId, quantity: input.quantity }],
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
