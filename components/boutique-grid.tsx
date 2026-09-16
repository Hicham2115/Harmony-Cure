"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Plus, SlidersHorizontal, X } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatPrice } from "@/lib/format-price";
import type { ShopifyProduct } from "@/lib/shopify";

const OBJECTIFS = [
  "Pousse & anti-chute",
  "Nettoyage doux",
  "Nutrition intense",
];
const HAIR_TYPES = [
  "Tous types",
  "Cheveux secs & abîmés",
  "Cheveux fins & sans volume",
  "Cuir chevelu sensible",
];

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
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
            key={option}
          >
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={() => onToggle(option)}
            />
            <span className="font-roboto text-sm text-[#585750] transition-colors group-hover:text-[#171715]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function BoutiqueGrid({ products }: { products: ShopifyProduct[] }) {
  const types = useMemo(
    () =>
      Array.from(
        new Set(products.map((product) => product.productType).filter(Boolean)),
      ),
    [products],
  );

  const maxPrice = useMemo(() => {
    const prices = products.map((product) =>
      Number(product.priceRange.minVariantPrice.amount),
    );
    return prices.length ? Math.ceil(Math.max(...prices)) : 0;
  }, [products]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedObjectifs, setSelectedObjectifs] = useState<string[]>([]);
  const [selectedHairTypes, setSelectedHairTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);

  const activeFilterCount =
    selectedTypes.length +
    selectedObjectifs.length +
    selectedHairTypes.length +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (selectedTypes.length && !selectedTypes.includes(product.productType))
        return false;
      const price = Number(product.priceRange.minVariantPrice.amount);
      if (price < priceRange[0] || price > priceRange[1]) return false;
      return true;
    });
  }, [products, selectedTypes, priceRange]);

  function resetFilters() {
    setSelectedTypes([]);
    setSelectedObjectifs([]);
    setSelectedHairTypes([]);
    setPriceRange([0, maxPrice]);
  }

  const filterGroups = (
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

      {types.length ? (
        <FilterGroup
          onToggle={(value) => setSelectedTypes(toggle(selectedTypes, value))}
          options={types}
          selected={selectedTypes}
          title="Type de soin"
        />
      ) : null}

      <FilterGroup
        onToggle={(value) =>
          setSelectedObjectifs(toggle(selectedObjectifs, value))
        }
        options={OBJECTIFS}
        selected={selectedObjectifs}
        title="Objectif"
      />

      <FilterGroup
        onToggle={(value) =>
          setSelectedHairTypes(toggle(selectedHairTypes, value))
        }
        options={HAIR_TYPES}
        selected={selectedHairTypes}
        title="Type de cheveux"
      />

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
        <div className="sticky top-24">{filterGroups}</div>
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
              {filterGroups}
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
                        className="flex size-9 items-center justify-center rounded-full bg-[#cdbb98] text-[#171715] transition-transform hover:scale-105"
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
