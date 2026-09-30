"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Leaf, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store/use-cart";
import type { ShopifyCart } from "@/lib/cart-actions";
import { createTierCheckout } from "@/lib/order-actions";

function formatAmount(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

function selectedUnitPrice(line: ShopifyCart["lines"]["nodes"][number]) {
  const value = line.attributes.find(
    (attribute) => attribute.key === "selected-unit-price",
  )?.value;
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0
    ? amount
    : Number(line.merchandise.price.amount);
}

function selectedLineTotal(line: ShopifyCart["lines"]["nodes"][number]) {
  const attributes = line.attributes;
  const selectedTotal = Number(
    attributes.find((attribute) => attribute.key === "selected-tier-total")?.value,
  );
  const selectedQuantity = Number(
    attributes.find((attribute) => attribute.key === "selected-tier-quantity")?.value,
  );

  if (
    Number.isFinite(selectedTotal) &&
    selectedTotal > 0 &&
    selectedQuantity === line.quantity
  ) {
    return selectedTotal;
  }

  return selectedUnitPrice(line) * line.quantity;
}

export function CartDrawer() {
  const {
    cart,
    cartId,
    isOpen,
    isLoading,
    closeCart,
    hydrate,
    updateItem,
    removeItem,
  } = useCartStore();
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lines = (cart?.lines.nodes ?? []).filter((line) => line.quantity > 0);
  const lineSubtotal = lines.reduce(
    (total, line) => total + selectedLineTotal(line),
    0,
  );
  const subtotal = lineSubtotal;
  const hasAppliedDiscount = cart?.discountCodes.some(
    (discount) => discount.applicable,
  );
  const shopifyTotal = Number(cart?.cost.totalAmount.amount ?? 0);
  const total =
    hasAppliedDiscount && shopifyTotal > 0 ? shopifyTotal : subtotal;
  const shippingAmount = hasAppliedDiscount && total > subtotal ? total - subtotal : 0;

  async function goToCheckout() {
    if (!cartId) return;
    setIsCreatingCheckout(true);
    try {
      const invoiceUrl = await createTierCheckout(cartId);
      window.location.assign(invoiceUrl);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Impossible d'ouvrir le paiement Shopify.",
      );
    } finally {
      setIsCreatingCheckout(false);
    }
  }

  return (
    <Sheet onOpenChange={(open) => !open && closeCart()} open={isOpen}>
      <SheetContent className="flex flex-col" side="right">
        <SheetHeader>
          <SheetTitle className="font-roboto">
            Panier {cart ? `(${cart.totalQuantity})` : ""}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
            <Leaf className="size-6 text-[#a77d38]" strokeWidth={1.2} />
            <p className="font-inter text-sm text-[#585750]">
              Votre panier est vide.
            </p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
            {lines.map((line) => (
              <div className="flex gap-3" key={line.id}>
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-[#f1ede4]">
                  {line.merchandise.image ? (
                    <Image
                      alt={
                        line.merchandise.image.altText ??
                        line.merchandise.product.title
                      }
                      className="object-cover"
                      fill
                      src={line.merchandise.image.url}
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <span className="font-roboto text-sm font-semibold text-[#171715]">
                    {line.merchandise.product.title}
                  </span>
                  <span className="font-roboto text-xs text-[#8a8478]">
                    {formatAmount(
                      String(selectedLineTotal(line)),
                      line.merchandise.price.currencyCode,
                    )}
                  </span>

                  <div className="mt-1 flex items-center gap-2">
                    <button
                      aria-label="Diminuer la quantité"
                      className="flex size-6 items-center justify-center rounded-full border border-[#a77d38]/40 text-[#171715] disabled:opacity-40"
                      disabled={isLoading}
                      onClick={() => updateItem(line.id, line.quantity - 1)}
                      type="button"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="font-roboto text-xs text-[#171715]">
                      {line.quantity}
                    </span>
                    <button
                      aria-label="Augmenter la quantité"
                      className="flex size-6 items-center justify-center rounded-full border border-[#a77d38]/40 text-[#171715] disabled:opacity-40"
                      disabled={isLoading}
                      onClick={() => updateItem(line.id, line.quantity + 1)}
                      type="button"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>

                <button
                  aria-label={`Retirer ${line.merchandise.product.title} du panier`}
                  className="self-start text-[#8a8478] hover:text-[#171715] disabled:opacity-40"
                  disabled={isLoading}
                  onClick={() => removeItem(line.id)}
                  type="button"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {cart && lines.length > 0 ? (
          <div className="flex flex-col gap-3 border-t border-[#a77d38]/20 p-4">
            <div className="flex items-center justify-between font-roboto text-sm font-semibold text-[#171715]">
              <span>Sous-total</span>
              <span>
                {formatAmount(
                  String(subtotal),
                  cart.cost.subtotalAmount.currencyCode,
                )}
              </span>
            </div>
            {shippingAmount > 0 ? (
              <div className="flex items-center justify-between font-roboto text-sm text-[#585750]">
                <span>Livraison Express</span>
                <span>
                  {formatAmount(
                    String(shippingAmount),
                    cart.cost.totalAmount.currencyCode,
                  )}
                </span>
              </div>
            ) : null}
            {total !== subtotal ? (
              <div className="flex items-center justify-between font-roboto text-sm font-semibold text-[#171715]">
                <span>Total</span>
                <span>
                  {formatAmount(
                    String(total),
                    cart.cost.totalAmount.currencyCode,
                  )}
                </span>
              </div>
            ) : null}
            <button
              className="inline-flex w-full items-center justify-center rounded-sm bg-[#0e3927] px-6 py-3.5 font-roboto text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] disabled:opacity-50 sm:text-sm"
              disabled={isCreatingCheckout || isLoading}
              onClick={goToCheckout}
              type="button"
            >
              {isCreatingCheckout ? "OUVERTURE DU PAIEMENT…" : "PASSER À LA CAISSE"}
            </button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
