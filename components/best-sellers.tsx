"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Heart,
  Leaf,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";

const PRODUCTS = [
  {
    rank: 1,
    name: "Sérum Pousse Cheveux",
    tags: "Stimule • Fortifie • Revitalise",
    rating: 5,
    reviews: 1288,
    price: "29,90 €",
  },
  {
    rank: 2,
    name: "Shampooing Doux",
    tags: "Nettoie • Hydrate • Apaise",
    rating: 5,
    reviews: 956,
    price: "19,90 €",
  },
  {
    rank: 3,
    name: "Masque Nutrition Cheveux",
    tags: "Nourrit • Répare • Protège",
    rating: 5,
    reviews: 842,
    price: "24,90 €",
  },
  {
    rank: 4,
    name: "Huile de Ricin 100% Pure",
    tags: "Fortifie • Densifie • Nourrit",
    rating: 4,
    reviews: 674,
    price: "16,90 €",
  },
  {
    rank: 5,
    name: "Crème Capillaire Nourrissante",
    tags: "Nourrit • Discipline • Protège",
    rating: 5,
    reviews: 512,
    price: "22,90 €",
  },
];

export function BestSellers() {
  const scrollerRef = useRef<HTMLDivElement>(null);

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

          <h2 className="font-heading text-4xl leading-[0.95] tracking-[-0.02em] text-[#171715] sm:text-5xl lg:text-6xl">
            Nos <span className=" text-[#aa6a12]">best-sellers</span>
          </h2>

          <p className="text-sm leading-relaxed text-[#0e0d0d] sm:text-base">
            Découvrez les soins préférés de notre communauté. Des formules
            naturelles, efficaces et sensorielles, plébiscitées chaque jour.
          </p>

          <Link
            href="/boutique"
            className="mt-2 inline-flex w-fit items-center gap-3 rounded-sm bg-[#0e3927] px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] sm:text-sm"
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
            {PRODUCTS.map((product) => (
              <article
                className="flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[#a77d38]/40 bg-white sm:w-72"
                key={product.rank}
              >
                <div className="relative flex aspect-square items-center justify-center bg-linear-to-b from-[#ece3d3] to-[#ddd0b6]">
                  <span className="absolute left-3 top-3 rounded-sm bg-[#0e3927] px-2 py-1 text-[10px] font-semibold tracking-wider text-white">
                    N°{product.rank}
                  </span>
                  <span className="absolute left-16 top-3 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-semibold tracking-wider text-[#171715]">
                    BEST-SELLER
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
                      {product.price}
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
