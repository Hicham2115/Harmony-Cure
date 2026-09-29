"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/get-error-message";
import { useCartStore } from "@/lib/store/use-cart";
import { brandToast } from "@/lib/toast";

const promoCodeSchema = z.object({
  promoCode: z
    .string()
    .trim()
    .min(1, "Saisissez un code promo.")
    .max(64, "Code promo invalide.")
    .regex(/^[A-Za-z0-9_-]+$/, "Code promo invalide."),
});

export function PromoCodeForm({ productId }: { productId: string }) {
  const applyDiscount = useCartStore((state) => state.applyDiscount);
  const applyPromoCode = useMutation({
    mutationFn: applyDiscount,
    onSuccess: () => {
      brandToast.success("Code promo appliqué", "La réduction est visible dans votre panier.");
    },
    onError: (error) => {
      brandToast.error("Code promo non appliqué", getErrorMessage(error));
    },
  });
  const form = useForm({
    defaultValues: { promoCode: "" },
    onSubmit: async ({ value }) => {
      const parsed = promoCodeSchema.safeParse(value);
      if (!parsed.success) {
        brandToast.error(parsed.error.issues[0]?.message ?? "Code promo invalide.");
        return;
      }
      await applyPromoCode.mutateAsync(parsed.data.promoCode);
    },
  });

  return (
    <form
      className="rounded-2xl border border-[#a77d38]/20 bg-[#faf8f4] px-5 py-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <label
        className="font-roboto text-sm font-semibold text-[#171715]"
        htmlFor={`promo-code-${productId}`}
      >
        Code promo
      </label>
      <div className="mt-2 flex gap-2">
        <form.Field name="promoCode">
          {(field) => (
            <Input
              className="h-11 border-[#a77d38]/30 bg-white font-inter uppercase placeholder:normal-case"
              id={`promo-code-${productId}`}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Saisissez votre code"
              value={field.state.value}
            />
          )}
        </form.Field>
        <Button
          className="h-11 shrink-0 bg-[#0e3927] px-4 font-roboto text-xs tracking-[0.06em] text-white hover:bg-[#0a2c1c]"
          disabled={applyPromoCode.isPending}
          type="submit"
        >
          APPLIQUER
        </Button>
      </div>
      <p className="mt-2 font-inter text-xs text-[#8a8478]">
        Ajoutez ce produit au panier avant d&apos;appliquer un code.
      </p>
    </form>
  );
}
