"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Leaf, Minus, Plus, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store/use-cart";

function formatAmount(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

export function CartDrawer() {
  const {
    cart,
    isOpen,
    isLoading,
    closeCart,
    hydrate,
    updateItem,
    removeItem,
  } = useCartStore();

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lines = (cart?.lines.nodes ?? []).filter((line) => line.quantity > 0);
  const lineSubtotal = lines.reduce(
    (total, line) => total + Number(line.merchandise.price.amount) * line.quantity,
    0,
  );
  const shopifySubtotal = Number(cart?.cost.subtotalAmount.amount ?? 0);
  const subtotal = shopifySubtotal > 0 ? shopifySubtotal : lineSubtotal;
  const hasAppliedDiscount = cart?.discountCodes.some(
    (discount) => discount.applicable,
  );
  const shopifyTotal = Number(cart?.cost.totalAmount.amount ?? 0);
  const total = hasAppliedDiscount || shopifyTotal > 0 ? shopifyTotal : subtotal;
  const shippingAmount = total > subtotal ? total - subtotal : 0;

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
                      line.merchandise.price.amount,
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
            <a
              className="inline-flex w-full items-center justify-center rounded-sm bg-[#0e3927] px-6 py-3.5 font-roboto text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] sm:text-sm"
              href={cart.checkoutUrl}
            >
              PASSER À LA CAISSE
            </a>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
