"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Leaf, Sprout } from "lucide-react";

import {
  Comparison,
  ComparisonHandle,
  ComparisonItem,
} from "@/components/ui/comparison";
import afterImage from "@/app/assets/after.png";
import beforeImage from "@/app/assets/before.png";

const FEATURES = [
  "Formules naturelles",
  "Stimule la croissance",
  "Hydrate & nourrit",
  "Résultats visibles",
];

const TRUST_ITEMS = [
  { icon: Sprout, label: "Testé dermatologiquement" },
  { icon: Heart, label: "Convient à tous types de cheveux" },
  { icon: Leaf, label: "Sans silicones ni parabènes" },
];

export function BeforeAfter() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <p className="text-sm font-medium tracking-[0.2em] text-[#a77d38]">
              RÉSULTATS VISIBLES
            </p>

            <h2 className="font-heading text-5xl leading-[0.95] tracking-[-0.02em] text-[#171715] sm:text-6xl lg:text-7xl">
              Avant Et <span className=" text-[#aa6a12]">après</span>
            </h2>

            <span className="h-px w-10 bg-[#a77d38]" />

            <p className="max-w-md text-lg leading-relaxed text-[#000000] sm:text-xl">
              Nos formules 100% naturelles, enrichies en actifs végétaux
              sélectionnés, stimulent la croissance des cheveux, renforcent les
              racines et hydratent le cuir chevelu pour des cheveux plus denses,
              plus sains et visiblement brillants.
            </p>

            <p className="max-w-md border-t border-[#a77d38]/25 pt-4 text-base tracking-[0.08em] text-[#04613c]">
              {FEATURES.join(" · ")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Comparison className="aspect-4/3 rounded-2xl bg-[#f1ede4]">
              <ComparisonItem position="left">
                <Image
                  alt="Avant"
                  className="object-cover"
                  fill
                  priority
                  src={beforeImage}
                />
              </ComparisonItem>
              <ComparisonItem position="right">
                <Image
                  alt="Après"
                  className="object-cover"
                  fill
                  priority
                  src={afterImage}
                />
              </ComparisonItem>

              <span className="pointer-events-none absolute left-4 top-4 z-40 rounded-sm bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#171715]">
                Avant
              </span>
              <span className="pointer-events-none absolute right-4 top-4 z-40 rounded-sm bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#171715]">
                Après
              </span>

              <ComparisonHandle>
                <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-white" />
                <div className="flex size-10 items-center justify-center rounded-full bg-white/95 text-[#171715] shadow-md">
                  <ChevronLeft className="size-3.5" />
                  <ChevronRight className="-ml-1.5 size-3.5" />
                </div>
              </ComparisonHandle>
            </Comparison>
          </div>
        </div>
      </div>
    </section>
  );
}
