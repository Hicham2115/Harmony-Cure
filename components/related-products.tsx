"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Plus } from "lucide-react";

import { formatPrice } from "@/lib/format-price";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCanOrder } from "@/components/can-order-provider";
import { useCartStore } from "@/lib/store/use-cart";
import { useFavoritesStore } from "@/lib/store/use-favorites";

export function RelatedProducts({ products }: { products: ShopifyProduct[] }) {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);
  const canOrder = useCanOrder();

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10 sm:py-14 lg:px-[5.8vw]">
      <h2 className="font-roboto text-2xl tracking-[-0.02em] text-[#171715] sm:text-3xl">
        Vous aimerez aussi
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => {
          const image = product.images.nodes[0];
          const isFavorite = favoriteIds.includes(product.id);
          const variantId = product.variants.nodes[0]?.id;

          return (
            <article
              className="flex flex-col overflow-hidden rounded-xl border border-[#a77d38]/20 bg-white transition-shadow hover:shadow-lg"
              key={product.id}
            >
              <Link
                className="relative flex aspect-square items-center justify-center bg-linear-to-b from-[#ece3d3] to-[#ddd0b6]"
                href={`/boutique/${product.handle}`}
              >
                <button
                  aria-label={
                    isFavorite
                      ? `Retirer ${product.title} des favoris`
                      : `Ajouter ${product.title} aux favoris`
                  }
                  aria-pressed={isFavorite}
                  className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#1a2e22] transition-transform hover:scale-105"
                  onClick={(event) => {
                    event.preventDefault();
                    toggleFavorite(product.id);
                  }}
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
              </Link>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-roboto text-lg text-[#171715]">
                  <Link href={`/boutique/${product.handle}`}>
                    {product.title}
                  </Link>
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-base font-semibold text-[#171715]">
                    {formatPrice(product)}
                  </span>
                  <button
                    aria-label={`Ajouter ${product.title} au panier`}
                    className="flex size-9 items-center justify-center rounded-full bg-[#cdbb98] text-[#171715] transition-transform hover:scale-105 disabled:opacity-50"
                    disabled={!variantId || !canOrder}
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
    </section>
  );
}
