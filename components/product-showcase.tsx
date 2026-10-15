"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import type { ShopifyProduct } from "@/lib/shopify";

const TRUST_LINE =
  "Livraison offerte dès 70€ · Paiement sécurisé · Satisfait ou remboursé";
const EXCLUDED_HANDLES = new Set([
  "brule-graisses",
  "pack-perte-de-poids",
  "pack-perte-de-poids-1-mois",
]);
const DESCRIPTION_PREVIEW_LENGTH = 500;

export function ProductShowcase({ products }: { products: ShopifyProduct[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const featuredProducts = products
    .filter((product) => !EXCLUDED_HANDLES.has(product.handle))
    .slice(0, 6);
  const active =
    featuredProducts.find((product) => product.id === activeId) ??
    featuredProducts[0];

  if (!active) return null;

  const image = active.images.nodes[0];
  const description = active.description.trim();
  const preview = description.slice(0, DESCRIPTION_PREVIEW_LENGTH);
  const completeSentence = preview.match(/[\s\S]*[.!?](?=\s|$)/)?.[0];
  const descriptionPreview =
    description.length > DESCRIPTION_PREVIEW_LENGTH
      ? completeSentence?.trimEnd() ?? description
      : description;

  return (
    <section
      id="produits"
      className="scroll-mt-24 bg-white py-10 sm:scroll-mt-32 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-[5.8vw]">
        <div
          aria-label="Choisir un produit"
          className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto border-b border-[#0e3927]/10 px-4 pb-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 lg:gap-4"
          role="group"
        >
          {featuredProducts.map((product) => {
            const isActive = product.id === active.id;

            return (
              <button
                aria-pressed={isActive}
                className={`max-w-[78vw] shrink-0 snap-start truncate rounded-full border px-4 py-2.5 text-center text-xs leading-snug transition-all duration-200 sm:max-w-none sm:text-sm ${
                  isActive
                    ? "border-[#0e3927] bg-[#0e3927] font-medium text-white shadow-sm"
                    : "border-[#0e3927]/15 bg-[#faf8f4] text-[#354339] hover:border-[#a77d38]/50 hover:bg-[#a77d38]/10"
                }`}
                key={product.id}
                onClick={() => setActiveId(product.id)}
                type="button"
              >
                {product.title}
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid min-w-0 items-center gap-6 sm:mt-12 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-xl bg-[#f1ede4] sm:aspect-3/4 sm:rounded-2xl">
            {image ? (
              <Image
                alt={image.altText ?? active.title}
                className="object-cover"
                fill
                priority
                src={image.url}
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Leaf className="size-16 text-[#a77d38]/50" />
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#0e3827] sm:text-xs">
              {active.productType || "HARMONY CURE"}
            </p>

            <h2 className="break-words text-3xl leading-[1.02] tracking-[-0.02em] text-[#171715] sm:text-5xl">
              {active.title}
            </h2>

            <span className="h-px w-10 bg-[#a77d38]" />

            {active.description ? (
              <p className="max-w-xl text-sm leading-6 text-[#000000] sm:text-lg sm:leading-relaxed">
                {descriptionPreview}
              </p>
            ) : null}

            <Link
              href={`/boutique/${active.handle}`}
              className="mt-1 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#0e3927] px-6 py-3.5 font-roboto text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] sm:min-h-0 sm:w-fit sm:text-sm"
            >
              ACHETER MAINTENANT
              <ArrowRight className="size-4" />
            </Link>

            <p className="text-center text-[11px] leading-5 text-[#8a8478] sm:text-left sm:text-xs">
              {TRUST_LINE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
