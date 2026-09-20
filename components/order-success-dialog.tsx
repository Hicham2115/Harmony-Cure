"use client";

import { CheckCircle2, Leaf, Phone, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function OrderSuccessDialog({
  orderName,
  onClose,
}: {
  orderName: string | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      open={orderName !== null}
    >
      <DialogContent
        className="gap-0 overflow-hidden border border-[#a77d38]/25 bg-[#faf8f4] p-0 sm:max-w-md"
        showCloseButton={false}
      >
        <div className="relative flex flex-col items-center gap-3 overflow-hidden bg-[#0e3927] px-6 pb-8 pt-10 text-center">
          <Leaf
            aria-hidden="true"
            className="absolute -left-4 -top-4 size-24 -rotate-12 text-[#e2c589]/10"
            strokeWidth={1}
          />
          <Leaf
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 size-24 rotate-12 text-[#e2c589]/10"
            strokeWidth={1}
          />
          <span className="flex size-16 items-center justify-center rounded-full bg-[#e2c589]/15 ring-1 ring-[#e2c589]/40">
            <CheckCircle2 className="size-9 text-[#e2c589]" strokeWidth={1.5} />
          </span>
          <DialogTitle className="font-roboto text-xl font-semibold text-white">
            Merci pour votre commande !
          </DialogTitle>
          <DialogDescription className="font-inter text-sm text-white/80">
            Commande{" "}
            <span className="font-semibold text-[#e2c589]">{orderName}</span>{" "}
            confirmée
          </DialogDescription>
        </div>

        <div className="flex flex-col gap-3 px-6 py-6 font-inter text-sm text-[#585750]">
          <p className="flex items-center gap-3">
            <Phone className="size-4 shrink-0 text-[#a77d38]" />
            Nous vous contacterons très bientôt pour confirmer la livraison.
          </p>
          <p className="flex items-center gap-3">
            <Truck className="size-4 shrink-0 text-[#a77d38]" />
            Paiement en espèces à la réception de votre colis.
          </p>
        </div>

        <div className="px-6 pb-6">
          <DialogClose
            render={
              <Button className="h-auto w-full bg-[#0e3927] py-3 font-roboto text-xs font-semibold tracking-[0.08em] hover:bg-[#0a2c1c]" />
            }
          >
            CONTINUER MES ACHATS
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
