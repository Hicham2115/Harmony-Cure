"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {
  Banknote,
  Leaf,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCodOrder } from "@/lib/order-actions";
import { codOrderSchema } from "@/lib/schemas/cod-order";
import { getErrorMessage } from "@/lib/get-error-message";
import { brandToast } from "@/lib/toast";

const SHIPPING_FEE = 0;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="font-inter text-xs text-red-600">{message}</p>;
}

export function CodOrderForm({
  variantId,
  productTitle,
  quantity,
  unitPrice,
  currencyCode,
}: {
  variantId: string | undefined;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  currencyCode: string;
}) {
  const subtotal = unitPrice * quantity;
  const total = subtotal + SHIPPING_FEE;

  function formatAmount(amount: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  }

  const createOrder = useMutation({
    mutationFn: (values: {
      fullName: string;
      phone: string;
      address: string;
    }) =>
      createCodOrder({
        variantId: variantId as string,
        quantity,
        ...values,
      }),
    onSuccess: (order) => {
      brandToast.success(
        `Commande ${order.name} confirmée`,
        "Nous vous contacterons pour la livraison.",
      );
      form.reset();
    },
    onError: (error) => {
      brandToast.error("Impossible de confirmer la commande", getErrorMessage(error));
    },
  });

  const form = useForm({
    defaultValues: { fullName: "", phone: "", address: "" },
    onSubmit: async ({ value }) => {
      if (!variantId) {
        brandToast.error("Produit indisponible", "Ce produit ne peut pas être commandé pour le moment.");
        return;
      }
      const parsed = codOrderSchema.safeParse(value);
      if (!parsed.success) {
        brandToast.error(parsed.error.issues[0]?.message ?? "Champs invalides.");
        return;
      }
      await createOrder.mutateAsync(parsed.data);
    },
  });

  return (
    <form
      className="mt-2 flex flex-col gap-6 overflow-hidden rounded-2xl border border-[#a77d38]/25 bg-[#faf8f4] shadow-[0_16px_40px_-24px_rgba(23,23,21,0.35)]"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex items-center gap-2 bg-[#0e3927] px-5 py-3.5">
        <Leaf className="size-4 text-[#e2c589]" fill="currentColor" strokeWidth={1.2} />
        <span className="font-roboto text-sm font-semibold tracking-[0.04em] text-white">
          Commande rapide — Paiement à la livraison
        </span>
      </div>

      <div className="flex flex-col gap-3 px-5">
        <div className="flex items-center gap-2 font-roboto text-xs font-semibold uppercase tracking-[0.1em] text-[#a77d38]">
          <Package className="size-3.5" />
          Produit
        </div>
        <div className="rounded-lg border border-[#a77d38]/20 bg-white px-4 py-3 font-inter text-sm text-[#171715]">
          {productTitle}
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg bg-white/60 px-4 py-3 font-inter text-sm text-[#585750]">
          <div className="flex items-center justify-between">
            <span>Quantité : {quantity}</span>
            <span>{formatAmount(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Livraison</span>
            <span>
              {SHIPPING_FEE === 0 ? "Offerte" : formatAmount(SHIPPING_FEE)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#171715] px-4 py-3 font-roboto text-base font-semibold text-white">
          <span>Total</span>
          <span className="text-[#e2c589]">{formatAmount(total)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) =>
                codOrderSchema.shape.fullName.safeParse(value).error
                  ?.issues[0]?.message,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label
                  className="font-roboto text-xs font-semibold text-[#171715]"
                  htmlFor={field.name}
                >
                  <User className="size-3.5 text-[#a77d38]" />
                  Nom complet *
                </Label>
                <Input
                  className="border-[#a77d38]/30 bg-white focus-visible:border-[#a77d38] focus-visible:ring-[#a77d38]/30"
                  id={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Entrez votre nom complet"
                  value={field.state.value}
                />
                <FieldError message={field.state.meta.errors[0]} />
              </div>
            )}
          </form.Field>

          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) =>
                codOrderSchema.shape.phone.safeParse(value).error?.issues[0]
                  ?.message,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label
                  className="font-roboto text-xs font-semibold text-[#171715]"
                  htmlFor={field.name}
                >
                  <Phone className="size-3.5 text-[#a77d38]" />
                  Numéro de téléphone *
                </Label>
                <Input
                  className="border-[#a77d38]/30 bg-white focus-visible:border-[#a77d38] focus-visible:ring-[#a77d38]/30"
                  id={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="06 123 456 789"
                  type="tel"
                  value={field.state.value}
                />
                <FieldError message={field.state.meta.errors[0]} />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field
          name="address"
          validators={{
            onChange: ({ value }) =>
              codOrderSchema.shape.address.safeParse(value).error?.issues[0]
                ?.message,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label
                className="font-roboto text-xs font-semibold text-[#171715]"
                htmlFor={field.name}
              >
                <MapPin className="size-3.5 text-[#a77d38]" />
                Adresse de livraison *
              </Label>
              <Textarea
                className="min-h-20 border-[#a77d38]/30 bg-white focus-visible:border-[#a77d38] focus-visible:ring-[#a77d38]/30"
                id={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Entrez votre adresse complète de livraison"
                value={field.state.value}
              />
              <FieldError message={field.state.meta.errors[0]} />
            </div>
          )}
        </form.Field>

        <Button
          className="group h-auto bg-[#0e3927] py-3.5 font-roboto text-xs font-semibold tracking-[0.08em] transition-all hover:bg-[#0a2c1c] hover:shadow-lg disabled:opacity-50"
          disabled={!variantId || createOrder.isPending}
          type="submit"
        >
          <ShoppingBag className="size-4 transition-transform group-hover:-translate-y-0.5" />
          {createOrder.isPending ? "ENVOI EN COURS..." : "PASSER LA COMMANDE"}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-[#a77d38]/20 bg-white/60 px-5 py-3">
        <span className="inline-flex items-center gap-1.5 font-inter text-xs text-[#585750]">
          <Truck className="size-3.5 text-[#a77d38]" />
          Livraison 24-48h
        </span>
        <span className="inline-flex items-center gap-1.5 font-inter text-xs text-[#585750]">
          <Banknote className="size-3.5 text-[#a77d38]" />
          Paiement à la livraison
        </span>
      </div>
    </form>
  );
}
