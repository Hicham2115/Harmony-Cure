"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getProductsByIds } from "@/lib/product-actions";
import { useCartStore } from "@/lib/store/use-cart";
import { useFavoritesStore } from "@/lib/store/use-favorites";

type FavoriteProduct = Awaited<ReturnType<typeof getProductsByIds>>[number];

function formatAmount(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

export function FavoritesDrawer() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const isOpen = useFavoritesStore((state) => state.isOpen);
  const closeFavorites = useFavoritesStore((state) => state.closeFavorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);

  const [products, setProducts] = useState<FavoriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    getProductsByIds(favoriteIds)
      .then(setProducts)
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, favoriteIds.join(",")]);

  return (
    <Sheet onOpenChange={(open) => !open && closeFavorites()} open={isOpen}>
      <SheetContent className="flex flex-col" side="right">
        <SheetHeader>
          <SheetTitle className="font-roboto">
            Favoris {favoriteIds.length ? `(${favoriteIds.length})` : ""}
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="font-inter text-sm text-[#585750]">Chargement...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
            <Leaf className="size-6 text-[#a77d38]" strokeWidth={1.2} />
            <p className="font-inter text-sm text-[#585750]">
              Vous n&apos;avez pas encore de favoris.
            </p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
            {products.map((product) => {
              const image = product.images.nodes[0];
              const variantId = product.variants.nodes[0]?.id;

              return (
                <div className="flex gap-3" key={product.id}>
                  <Link
                    className="relative size-16 shrink-0 overflow-hidden rounded-md bg-[#f1ede4]"
                    href={`/boutique/${product.handle}`}
                    onClick={() => closeFavorites()}
                  >
                    {image ? (
                      <Image
                        alt={image.altText ?? product.title}
                        className="object-cover"
                        fill
                        src={image.url}
                      />
                    ) : null}
                  </Link>

                  <div className="flex flex-1 flex-col gap-1">
                    <Link
                      className="font-roboto text-sm font-semibold text-[#171715]"
                      href={`/boutique/${product.handle}`}
                      onClick={() => closeFavorites()}
                    >
                      {product.title}
                    </Link>
                    <span className="font-roboto text-xs text-[#8a8478]">
                      {formatAmount(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode,
                      )}
                    </span>

                    <button
                      aria-label={`Ajouter ${product.title} au panier`}
                      className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#cdbb98] px-3 py-1 font-roboto text-[11px] font-semibold text-[#171715] transition-transform hover:scale-105 disabled:opacity-50"
                      disabled={!variantId}
                      onClick={() => variantId && addItem(variantId)}
                      type="button"
                    >
                      <ShoppingBag className="size-3" />
                      Ajouter
                    </button>
                  </div>

                  <button
                    aria-label={`Retirer ${product.title} des favoris`}
                    className="self-start text-[#a77d38] hover:text-[#171715]"
                    onClick={() => toggleFavorite(product.id)}
                    type="button"
                  >
                    <Heart className="size-4" fill="currentColor" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
