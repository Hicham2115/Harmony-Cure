"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  FlaskConical,
  Heart,
  Leaf,
  Sparkles,
  Sprout,
  TestTube,
} from "lucide-react";

import {
  Comparison,
  ComparisonHandle,
  ComparisonItem,
} from "@/components/ui/comparison";
import afterImage from "@/app/assets/after.png";
import beforeImage from "@/app/assets/before.png";

const FEATURES = [
  { icon: Leaf, label: "Formules naturelles" },
  { icon: Sprout, label: "Stimule la croissance" },
  { icon: Droplets, label: "Hydrate & nourrit" },
  { icon: Sparkles, label: "Résultats visibles" },
];

const TRUST_ITEMS = [
  { icon: Leaf, label: "Ingrédients 100% naturels" },
  { icon: FlaskConical, label: "Sans parabènes ni sulfates" },
  { icon: Heart, label: "Respectueux du cuir chevelu" },
  { icon: TestTube, label: "Testé dermatologiquement et approuvé" },
];

export function BeforeAfter() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 size-72 -rotate-12 text-[#0e3927]/10 sm:size-96"
        strokeWidth={0.5}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="h-px w-10 bg-[#a77d38]" />

            <h2 className="font-heading text-5xl leading-[0.95] tracking-[-0.02em] text-[#171715] sm:text-6xl lg:text-7xl">
              Avant Et <span className="italic text-[#aa6a12]">après</span>
            </h2>

            <div className="-my-2 flex items-center gap-2">
              <span className="h-px w-10 bg-[#a77d38]" />
              <Leaf className="size-3.5 text-[#a77d38]" strokeWidth={1.2} />
            </div>

            <p className="max-w-lg text-base leading-relaxed text-[#3d3a34] sm:text-lg">
              Nos formules 100 % naturelles, enrichies en actifs végétaux
              rigoureusement sélectionnés, agissent en profondeur pour stimuler
              la croissance des cheveux, renforcer les racines et hydrater
              durablement le cuir chevelu. Grâce à une combinaison d’ingrédients
              naturels aux propriétés nourrissantes et revitalisantes, elles
              contribuent à améliorer la santé et la vitalité de vos cheveux au
              quotidien, pour une chevelure plus dense, plus forte, plus saine
              et visiblement plus brillante.
            </p>
          </div>

          <Comparison className="aspect-4/3 rounded-2xl bg-[#f1ede4] shadow-[0_20px_50px_rgba(42,34,22,0.12)]">
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

            <span className="pointer-events-none absolute left-4 top-4 z-40 rounded-full bg-[#0e3927] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Avant
            </span>
            <span className="pointer-events-none absolute right-4 top-4 z-40 rounded-full bg-[#aa6a12] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Après
            </span>

            <ComparisonHandle>
              <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-white/80" />
              <div className="flex size-9 items-center justify-center rounded-full bg-white text-[#171715] shadow-md">
                <ChevronLeft className="size-3" />
                <ChevronRight className="-ml-1 size-3" />
              </div>
            </ComparisonHandle>
          </Comparison>
        </div>

        {/* <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl bg-white p-6 sm:grid-cols-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div className="flex items-center gap-3" key={label}>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#a77d38]/30 text-[#0e3927]">
                <Icon className="size-5" strokeWidth={1.25} />
              </div>
              <span className="text-sm leading-tight text-[#3d3a34]">
                {label}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
