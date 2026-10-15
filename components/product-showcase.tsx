"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import type { ShopifyProduct } from "@/lib/shopify";

const TRUST_LINE =
  "Livraison offerte dès 70€ · Paiement sécurisé · Satisfait ou remboursé";

export function ProductShowcase({ products }: { products: ShopifyProduct[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const featuredProducts = products.slice(0, 6);
  const active =
    featuredProducts.find((product) => product.id === activeId) ??
    featuredProducts[0];

  if (!active) return null;

  const image = active.images.nodes[0];

  return (
    <section
      id="produits"
      className="scroll-mt-32 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-black/10 pb-px">
          {featuredProducts.map((product) => {
            const isActive = product.id === active.id;

            return (
              <button
                aria-pressed={isActive}
                className={`-mb-px cursor-pointer border-b-2 pb-3 text-sm tracking-wide transition-colors ${
                  isActive
                    ? "border-[#a77d38] text-[#171715]"
                    : "border-transparent text-[#040404] hover:text-[#171715]"
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

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-[#f1ede4]">
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

          <div className="flex flex-col gap-5">
            <p className="text-xs font-medium tracking-[0.2em] text-[#0e3827]">
              {active.productType || "HARMONY CURE"}
            </p>

            <h2 className="text-4xl leading-[0.98] tracking-[-0.02em] text-[#171715] sm:text-5xl">
              {active.title}
            </h2>

            <span className="h-px w-10 bg-[#a77d38]" />

            {active.description ? (
              <p className="max-w-xl text-base leading-relaxed text-[#000000] sm:text-lg">
                {active.description}
              </p>
            ) : null}

            <Link
              href={`/boutique/${active.handle}`}
              className="mt-1 inline-flex w-fit items-center gap-3 rounded-sm bg-[#0e3927] px-6 py-3.5 font-roboto text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] sm:text-sm"
            >
              ACHETER MAINTENANT
              <ArrowRight className="size-4" />
            </Link>

            <p className="text-xs text-[#8a8478]">{TRUST_LINE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
