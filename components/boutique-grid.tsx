"use client";

import { useMemo, useState } from "react";
import { Leaf, Plus, SlidersHorizontal, Star, X } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PRODUCTS = [
  {
    id: "serum-pousse-cheveux",
    name: "Sérum Pousse Cheveux",
    tags: "Stimule • Fortifie • Revitalise",
    price: 29.9,
    rating: 5,
    reviews: 1288,
    type: "Sérum",
    objectif: "Pousse & anti-chute",
    hairType: "Cheveux fins & sans volume",
  },
  {
    id: "shampooing-doux",
    name: "Shampooing Doux",
    tags: "Nettoie • Hydrate • Apaise",
    price: 19.9,
    rating: 5,
    reviews: 956,
    type: "Shampooing",
    objectif: "Nettoyage doux",
    hairType: "Cuir chevelu sensible",
  },
  {
    id: "masque-nutrition-cheveux",
    name: "Masque Nutrition Cheveux",
    tags: "Nourrit • Répare • Protège",
    price: 24.9,
    rating: 5,
    reviews: 842,
    type: "Masque",
    objectif: "Nutrition intense",
    hairType: "Cheveux secs & abîmés",
  },
  {
    id: "huile-de-ricin",
    name: "Huile de Ricin 100% Pure",
    tags: "Fortifie • Densifie • Nourrit",
    price: 16.9,
    rating: 4,
    reviews: 674,
    type: "Huile",
    objectif: "Pousse & anti-chute",
    hairType: "Tous types",
  },
  {
    id: "creme-capillaire-nourrissante",
    name: "Crème Capillaire Nourrissante",
    tags: "Nourrit • Discipline • Protège",
    price: 22.9,
    rating: 5,
    reviews: 512,
    type: "Crème",
    objectif: "Nutrition intense",
    hairType: "Cheveux secs & abîmés",
  },
];

const TYPES = ["Sérum", "Shampooing", "Masque", "Huile", "Crème"];
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

const MAX_PRICE = 30;

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
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#171715]">
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
            <span className="text-sm text-[#585750] transition-colors group-hover:text-[#171715]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function BoutiqueGrid() {
  const [types, setTypes] = useState<string[]>([]);
  const [objectifs, setObjectifs] = useState<string[]>([]);
  const [hairTypes, setHairTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);

  const activeFilterCount =
    types.length +
    objectifs.length +
    hairTypes.length +
    (priceRange[0] > 0 || priceRange[1] < MAX_PRICE ? 1 : 0);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (types.length && !types.includes(product.type)) return false;
      if (objectifs.length && !objectifs.includes(product.objectif))
        return false;
      if (hairTypes.length && !hairTypes.includes(product.hairType))
        return false;
      if (product.price < priceRange[0] || product.price > priceRange[1])
        return false;
      return true;
    });
  }, [types, objectifs, hairTypes, priceRange]);

  function resetFilters() {
    setTypes([]);
    setObjectifs([]);
    setHairTypes([]);
    setPriceRange([0, MAX_PRICE]);
  }

  const filterGroups = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#171715]">
          Prix
        </h3>
        <Slider
          max={MAX_PRICE}
          min={0}
          onValueChange={(value) =>
            setPriceRange(Array.isArray(value) ? [...value] : [value])
          }
          step={1}
          value={priceRange}
        />
        <p className="text-sm text-[#585750]">
          {priceRange[0]} € – {priceRange[1]} €
        </p>
      </div>

      <FilterGroup
        onToggle={(value) => setTypes(toggle(types, value))}
        options={TYPES}
        selected={types}
        title="Type de soin"
      />

      <FilterGroup
        onToggle={(value) => setObjectifs(toggle(objectifs, value))}
        options={OBJECTIFS}
        selected={objectifs}
        title="Objectif"
      />

      <FilterGroup
        onToggle={(value) => setHairTypes(toggle(hairTypes, value))}
        options={HAIR_TYPES}
        selected={hairTypes}
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
            {filtered.map((product) => (
              <article
                className="flex flex-col overflow-hidden rounded-xl border border-[#a77d38]/20 bg-white transition-shadow hover:shadow-lg"
                key={product.id}
              >
                <div className="relative flex aspect-square items-center justify-center bg-linear-to-b from-[#ece3d3] to-[#ddd0b6]">
                  <span className="absolute left-3 top-3 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-semibold tracking-wider text-[#171715]">
                    {product.type.toUpperCase()}
                  </span>
                  <Leaf
                    aria-hidden="true"
                    className="size-12 text-[#a77d38]/40"
                    strokeWidth={1}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="font-heading text-lg text-[#171715]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#8a8478]">{product.tags}</p>

                  <div className="flex items-center gap-1.5">
                    <div className="flex text-[#a77d38]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          className="size-3.5"
                          fill={
                            index < product.rating ? "currentColor" : "none"
                          }
                          key={index}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#8a8478]">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-semibold text-[#171715]">
                      {product.price.toFixed(2).replace(".", ",")} €
                    </span>
                    <button
                      aria-label={`Ajouter ${product.name} au panier`}
                      className="flex size-9 items-center justify-center rounded-full bg-[#cdbb98] text-[#171715] transition-transform hover:scale-105"
                      type="button"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
