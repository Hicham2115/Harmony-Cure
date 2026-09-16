"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { MapPin, Package, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCodOrder } from "@/lib/order-actions";
import { codOrderSchema } from "@/lib/schemas/cod-order";
import { getErrorMessage } from "@/lib/get-error-message";

const SHIPPING_FEE = 0;

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
      toast.success(`Commande ${order.name} confirmée`, {
        description: "Nous vous contacterons pour la livraison.",
      });
      form.reset();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const form = useForm({
    defaultValues: { fullName: "", phone: "", address: "" },
    onSubmit: async ({ value }) => {
      if (!variantId) {
        toast.error("Ce produit n'est pas disponible à la commande.");
        return;
      }
      const parsed = codOrderSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Champs invalides.");
        return;
      }
      await createOrder.mutateAsync(parsed.data);
    },
  });

  return (
    <form
      className="mt-2 flex flex-col gap-5 rounded-xl border border-[#a77d38]/20 bg-[#faf8f4] p-5"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-roboto text-sm font-semibold text-[#171715]">
          <Package className="size-4 text-[#a77d38]" />
          Produit
        </div>
        <div className="rounded-lg border border-[#a77d38]/20 bg-white px-4 py-3 font-inter text-sm text-[#171715]">
          {productTitle}
        </div>

        <div className="flex items-center justify-between font-inter text-sm text-[#585750]">
          <span>Quantité : {quantity}</span>
          <span>Sous-total : {formatAmount(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between font-inter text-sm text-[#585750]">
          <span>Livraison</span>
          <span>
            {SHIPPING_FEE === 0 ? "Offerte" : formatAmount(SHIPPING_FEE)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-[#a77d38]/20 pt-3 font-roboto text-base font-semibold text-[#171715]">
          <span>Total</span>
          <span>{formatAmount(total)}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="fullName"
          validators={{
            onChange: ({ value }) =>
              codOrderSchema.shape.fullName.safeParse(value).error?.issues[0]
                ?.message,
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
                id={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Entrez votre nom complet"
                value={field.state.value}
              />
              {field.state.meta.errors.length ? (
                <p className="font-inter text-xs text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              ) : null}
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
                id={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="06 123 456 789"
                type="tel"
                value={field.state.value}
              />
              {field.state.meta.errors.length ? (
                <p className="font-inter text-xs text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              ) : null}
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
              id={field.name}
              className="min-h-20"
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Entrez votre adresse complète de livraison"
              value={field.state.value}
            />
            {field.state.meta.errors.length ? (
              <p className="font-inter text-xs text-red-600">
                {field.state.meta.errors[0]}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <Button
        className="bg-[#171715] font-roboto text-xs font-semibold tracking-[0.06em] hover:bg-black"
        disabled={!variantId || createOrder.isPending}
        type="submit"
      >
        <Package className="size-4" />
        {createOrder.isPending ? "ENVOI EN COURS..." : "PASSER LA COMMANDE"}
      </Button>

      <div className="flex items-center justify-center gap-4 font-inter text-xs text-[#8a8478]">
        <span>Livraison 24-48h</span>
        <span>Paiement à la livraison</span>
      </div>
    </form>
  );
}
