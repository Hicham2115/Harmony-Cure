"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";

import { formatPrice } from "@/lib/format-price";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/lib/store/use-cart";
import { useFavoritesStore } from "@/lib/store/use-favorites";

export function BestSellers({ products }: { products: ShopifyProduct[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-56 rotate-45 text-[#0e3927]/10 sm:size-72 lg:size-96"
        strokeWidth={0.6}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#a77d38]">
            <Leaf className="size-3.5" strokeWidth={1.2} />
            TOUTES NOS CURES
          </p>

          <h2 className=" text-4xl leading-[0.95] tracking-[-0.02em] text-[#171715] sm:text-5xl lg:text-6xl">
            Nos <span className=" text-[#aa6a12]">best-sellers</span>
          </h2>

          <p className="text-base leading-relaxed text-[#0e0d0d] sm:text-lg font-roboto">
            Découvrez les soins préférés de notre communauté. Des formules
            naturelles, efficaces et sensorielles, plébiscitées chaque jour.
          </p>

          <Link
            href="/boutique"
            className="mt-2 font-roboto inline-flex w-fit items-center gap-3 rounded-sm bg-[#0e3927] px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] sm:text-sm"
          >
            DÉCOUVRIR TOUTES NOS CURES
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <button
            aria-label="Produit précédent"
            className="absolute left-0 top-1/3 z-10 hidden size-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a2e22] shadow-md transition-transform hover:scale-105 sm:flex"
            onClick={() => scrollByCard(-1)}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
            ref={scrollerRef}
          >
            {products.map((product, index) => {
              const image = product.images.nodes[0];

              const isFavorite = favoriteIds.includes(product.id);
              const variantId = product.variants.nodes[0]?.id;

              return (
                <article
                  className="flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[#a77d38]/40 bg-white sm:w-72"
                  key={product.id}
                >
                  <div className="group relative flex aspect-square items-center justify-center bg-linear-to-b from-[#ece3d3] to-[#ddd0b6]">
                    <span className="absolute left-3 top-3 z-10 rounded-sm bg-[#0e3927] px-2 py-1 text-xs font-semibold tracking-wider text-white">
                      N°{index + 1}
                    </span>
                    <span className="absolute left-16 top-3 z-10 rounded-sm bg-white/90 px-2 py-1 text-xs font-semibold tracking-wider text-[#171715]">
                      BEST-SELLER
                    </span>
                    <button
                      aria-label={
                        isFavorite
                          ? `Retirer ${product.title} des favoris`
                          : `Ajouter ${product.title} aux favoris`
                      }
                      aria-pressed={isFavorite}
                      className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#1a2e22] transition-transform hover:scale-105"
                      onClick={() => toggleFavorite(product.id)}
                      type="button"
                    >
                      <Heart
                        className="size-4"
                        fill={isFavorite ? "currentColor" : "none"}
                      />
                    </button>
                    {image ? (
                      <Image
                        alt={image.altText ?? product.title}
                        className="object-cover"
                        fill
                        src={image.url}
                      />
                    ) : (
                      <Leaf
                        aria-hidden="true"
                        className="size-12 text-[#a77d38]/40"
                        strokeWidth={1}
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-black/5 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button
                        aria-label={`Ajouter ${product.title} au panier`}
                        className="pointer-events-auto flex size-11 cursor-pointer translate-y-4 items-center justify-center rounded-full bg-white text-[#1a2e22] shadow-md transition-transform duration-300 ease-out hover:scale-105 group-hover:translate-y-0 disabled:opacity-50"
                        disabled={!variantId}
                        onClick={() => variantId && addItem(variantId)}
                        type="button"
                      >
                        <ShoppingBag className="size-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="font-roboto font-bold text-lg text-[#171715]">
                      {product.title}
                    </h3>
                    {product.description ? (
                      <p className="line-clamp-2 text-xs text-[#8a8478]">
                        {product.description}
                      </p>
                    ) : null}

                    <div className="flex items-center gap-1.5 text-[#a77d38]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          className="size-3.5"
                          fill="currentColor"
                          key={starIndex}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-base font-semibold text-[#171715]">
                        {formatPrice(product)}
                      </span>
                      <button
                        aria-label={`Ajouter ${product.title} au panier`}
                        className="flex size-9 items-center justify-center rounded-full bg-[#cdbb98] text-[#171715] transition-transform hover:scale-105 disabled:opacity-50"
                        disabled={!variantId}
                        onClick={() => variantId && addItem(variantId)}
                        type="button"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            aria-label="Produit suivant"
            className="absolute right-0 top-1/3 z-10 hidden size-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white text-[#1a2e22] shadow-md transition-transform hover:scale-105 sm:flex"
            onClick={() => scrollByCard(1)}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
