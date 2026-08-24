import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import ctaImage from "@/app/assets/calltoaction.jpg";

export function ClinicallyProven() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="grid overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(42,34,22,0.12)] lg:grid-cols-2">
          <div className="relative aspect-4/3 lg:aspect-auto">
            <Image
              alt="Cliniquement prouvés"
              className="object-cover"
              fill
              priority
              src={ctaImage}
            />
          </div>

          <div className="flex flex-col items-center gap-5 bg-[#0e3927] px-8 py-16 text-center sm:px-14">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#e0c88a]">
              <Leaf className="size-3.5" strokeWidth={1.2} />
              PREUVES SCIENTIFIQUES
            </p>

            <h2 className="font-heading text-4xl leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl">
              Cliniquement{" "}
              <span className="italic text-[#e0c88a]">prouvés</span>
            </h2>

            <span className="h-px w-10 bg-[#a77d38]" />

            <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
              Tous nos produits sont cliniquement prouvés : des examens ont été
              effectués et les résultats ont été à la hauteur de nos espérances.
            </p>

            <Link
              href="/boutique"
              className="mt-1 inline-flex w-fit items-center gap-3 rounded-full bg-[#e2c589] px-7 py-3.5 text-xs font-bold tracking-[0.06em] text-[#0e3927] transition-colors hover:bg-[#f0d9a5] sm:text-sm"
            >
              JE LES VEUX !
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
