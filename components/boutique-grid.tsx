"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Plus, SlidersHorizontal, X } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatPrice } from "@/lib/format-price";
import type { ShopifyProduct, ShopifyStorefrontFilter } from "@/lib/shopify";
import { useCanOrder } from "@/components/can-order-provider";
import { useCartStore } from "@/lib/store/use-cart";
import { useFavoritesStore } from "@/lib/store/use-favorites";

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

type FilterInput = {
  available?: boolean;
  handles?: string[];
  productType?: string;
  tag?: string;
};

function parseFilterInput(input: unknown): FilterInput | null {
  if (typeof input === "object" && input !== null) {
    return input as FilterInput;
  }

  if (typeof input !== "string") return null;

  try {
    return JSON.parse(input) as FilterInput;
  } catch {
    return null;
  }
}

function canApplyFilter(input: FilterInput | null) {
  return Boolean(
    input?.available !== undefined ||
      input?.handles ||
      input?.productType ||
      input?.tag,
  );
}

function matchesFilter(product: ShopifyProduct, input: FilterInput) {
  if (input.available !== undefined) {
    return product.variants.nodes.some(
      (variant: { availableForSale: boolean }) =>
        variant.availableForSale === input.available,
    );
  }

  if (input.productType) return product.productType === input.productType;
  if (input.tag) return product.tags.includes(input.tag);
  if (input.handles) return input.handles.includes(product.handle);
  return true;
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-roboto text-xs font-semibold uppercase tracking-[0.12em] text-[#171715]">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">
        {options.map((option) => (
          <label
            className="group flex cursor-pointer items-center gap-2.5"
            key={option.id}
          >
            <Checkbox
              checked={selected.includes(option.id)}
              onCheckedChange={() => onToggle(option.id)}
            />
            <span className="font-roboto text-sm text-[#585750] transition-colors group-hover:text-[#171715]">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function BoutiqueGrid({
  filters,
  products,
}: {
  filters: ShopifyStorefrontFilter[];
  products: ShopifyProduct[];
}) {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);
  const canOrder = useCanOrder();

  const filterGroups = useMemo(() => {
    const shopifyGroups = filters
      .map((filter) => ({
        ...filter,
        values: filter.values.filter((value) =>
          canApplyFilter(parseFilterInput(value.input)),
        ),
      }))
      .filter((filter) => filter.values.length > 0 && filter.type !== "PRICE_RANGE");

    if (shopifyGroups.length > 0) return shopifyGroups;

    const tags = Array.from(new Set(products.flatMap((product) => product.tags)));

    if (tags.length > 0) {
      return [
        {
          id: "product-tags",
          label: "Catégorie",
          type: "LIST" as const,
          values: tags.map((tag) => ({
            id: tag,
            label: tag,
            count: products.filter((product) => product.tags.includes(tag)).length,
            input: { tag },
          })),
        },
      ];
    }

    const byTitle = (terms: string[]) =>
      products
        .filter((product) =>
          terms.some((term) => product.title.toLowerCase().includes(term)),
        )
        .map((product) => product.handle);

    const objectives = [
      {
        id: "weight",
        label: "Gestion du poids",
        handles: byTitle(["perte de poids", "brûleur", "coupe-faim"]),
      },
      {
        id: "hair",
        label: "Cheveux & anti-chute",
        handles: byTitle(["anti-chute", "harmony love"]),
      },
      {
        id: "skin",
        label: "Peau & collagène",
        handles: byTitle(["collagène", "harmony love"]),
      },
    ].filter((objective) => objective.handles.length > 0);

    const packs = products
      .filter((product) => product.title.toLowerCase().startsWith("pack"))
      .map((product) => product.handle);
    const individualCures = products
      .filter((product) => !packs.includes(product.handle))
      .map((product) => product.handle);

    return [
      {
        id: "objective",
        label: "Objectif",
        type: "LIST" as const,
        values: objectives.map((objective) => ({
          id: objective.id,
          label: objective.label,
          count: objective.handles.length,
          input: { handles: objective.handles },
        })),
      },
      {
        id: "format",
        label: "Format",
        type: "LIST" as const,
        values: [
          { id: "packs", label: "Packs", handles: packs },
          {
            id: "individual-cures",
            label: "Cures individuelles",
            handles: individualCures,
          },
        ]
          .filter((format) => format.handles.length > 0)
          .map((format) => ({
            id: format.id,
            label: format.label,
            count: format.handles.length,
            input: { handles: format.handles },
          })),
      },
    ].filter((filter) => filter.values.length > 0);
  }, [filters, products]);

  const maxPrice = useMemo(() => {
    const prices = products.map((product) =>
      Number(product.priceRange.minVariantPrice.amount),
    );
    return prices.length ? Math.ceil(Math.max(...prices)) : 0;
  }, [products]);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);

  const activeFilterCount =
    selectedValues.length +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      for (const group of filterGroups) {
        const selectedInGroup = group.values.filter((value) =>
          selectedValues.includes(`${group.id}:${value.id}`),
        );

        if (
          selectedInGroup.length > 0 &&
          !selectedInGroup.some((value) => {
            const input = parseFilterInput(value.input);
            return input ? matchesFilter(product, input) : false;
          })
        ) {
          return false;
        }
      }
      const price = Number(product.priceRange.minVariantPrice.amount);
      if (price < priceRange[0] || price > priceRange[1]) return false;
      return true;
    });
  }, [filterGroups, products, selectedValues, priceRange]);

  function resetFilters() {
    setSelectedValues([]);
    setPriceRange([0, maxPrice]);
  }

  const filterControls = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="font-roboto text-xs font-semibold uppercase tracking-[0.12em] text-[#171715]">
          Prix
        </h3>
        <Slider
          max={maxPrice}
          min={0}
          onValueChange={(value) =>
            setPriceRange(Array.isArray(value) ? [...value] : [value])
          }
          step={1}
          value={priceRange}
        />
        <p className="font-roboto text-sm text-[#585750]">
          {priceRange[0]} € – {priceRange[1]} €
        </p>
      </div>

      {filterGroups.map((group) => {
        return (
          <FilterGroup
            key={group.id}
            onToggle={(value) => setSelectedValues(toggle(selectedValues, value))}
            options={group.values.map((value) => ({
              id: `${group.id}:${value.id}`,
              label: value.label,
            }))}
            selected={selectedValues}
            title={group.label}
          />
        );
      })}

      {activeFilterCount > 0 ? (
        <button
          className="inline-flex w-fit items-center gap-1.5 text-xs font-medium tracking-wide text-[#a77d38] transition-colors hover:text-[#0e3927]"
          onClick={resetFilters}
          type="button"
        >
          <X className="size-3.5" />
          Réinitialiser les filtres
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
      <aside className="hidden lg:block">
        <div className="sticky top-24">{filterControls}</div>
      </aside>

      <div>
        <div className="mb-6 flex items-center justify-between gap-4 lg:justify-end">
          <Popover>
            <PopoverTrigger className="inline-flex items-center gap-2 rounded-sm border border-[#a77d38]/30 px-4 py-2.5 text-xs font-semibold tracking-wide text-[#171715] transition-colors hover:border-[#a77d38] lg:hidden">
              <SlidersHorizontal className="size-3.5" />
              FILTRES
              {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 p-5">
              {filterControls}
            </PopoverContent>
          </Popover>

          <p className="text-sm text-[#8a8478]">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#a77d38]/30 py-20 text-center">
            <Leaf className="size-6 text-[#a77d38]" strokeWidth={1.2} />
            <p className="text-sm text-[#585750]">
              Aucun produit ne correspond à vos filtres.
            </p>
            <button
              className="text-xs font-semibold tracking-wide text-[#a77d38] underline-offset-4 hover:underline"
              onClick={resetFilters}
              type="button"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => {
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
                    {product.productType ? (
                      <span className="absolute left-3 top-3 z-10 rounded-sm bg-white/90 px-2 py-1 text-xs font-semibold tracking-wider text-[#171715]">
                        {product.productType.toUpperCase()}
                      </span>
                    ) : null}
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
                    <h3 className="font-heading text-lg text-[#171715]">
                      <Link href={`/boutique/${product.handle}`}>
                        {product.title}
                      </Link>
                    </h3>
                    {product.description ? (
                      <p className="line-clamp-2 text-xs text-[#8a8478]">
                        {product.description}
                      </p>
                    ) : null}

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
        )}
      </div>
    </div>
  );
}
