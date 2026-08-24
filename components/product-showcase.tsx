"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import antiChuteImage from "@/app/assets/anti_chute.webp";
import bruleGraissesImage from "@/app/assets/Brule.webp";
import collageneImage from "@/app/assets/collagene_main.webp";
import coupeFaimImage from "@/app/assets/coupe_main.webp";
import packLoveImage from "@/app/assets/pack_love.webp";
import packPoidsImage from "@/app/assets/pack_poids.webp";

const CATEGORIES = [
  {
    id: "pack-love",
    tabLabel: "Pack Love",
    eyebrow: "PACK LOVE",
    title: "Collagène marin",
    titleAccent: "+ anti chute vegan",
    description:
      "Le Pack Beauté & Vitalité réunit deux essentiels : le Collagène Marin enrichi en Vitamine C et Acide Hyaluronique pour une peau revitalisée et des articulations soutenues, et l'Anti-Chute Vegan à base de Roquette pour des cheveux plus forts et stimulés. Une solution complète et naturelle pour révéler votre beauté de l'intérieur.",
    features: [
      "Peau éclatante",
      "Cheveux fortifiés",
      "Articulations soutenues",
    ],
    image: packLoveImage,
  },
  {
    id: "pack-perte-de-poids",
    tabLabel: "Pack Perte de Poids",
    eyebrow: "PACK PERTE DE POIDS",
    title: "Brûle-graisses",
    titleAccent: "+ coupe-faim naturel",
    description:
      "Le Pack Perte de Poids réunit le Brûle-graisses à base de thé vert, guarana et maté pour stimuler la dépense énergétique, et le Coupe-faim à base de konjac pour limiter la sensation de faim. Une routine complète pour accompagner votre perte de poids naturellement.",
    features: ["Combustion active", "Moins de faim", "Silhouette affinée"],
    image: packPoidsImage,
  },
  {
    id: "anti-chute",
    tabLabel: "Anti-Chute",
    eyebrow: "ANTI-CHUTE",
    title: "Anti-Chute de Cheveux",
    titleAccent: "Cure 1 / 3 mois",
    description:
      "Notre Complément Alimentaire Vegan Anti-Chute à base de Roquette stimule le bulbe capillaire, freine la chute et favorise une repousse naturelle pour des cheveux plus forts et plus denses.",
    features: null,
    image: antiChuteImage,
  },
  {
    id: "collagene",
    tabLabel: "Collagène",
    eyebrow: "COLLAGÈNE",
    title: "Collagène Marin",
    titleAccent: null,
    description:
      "Notre Collagène Marin enrichi en Vitamine C, Acide Hyaluronique et Zinc hydrate intensément, stimule la production naturelle de collagène et protège la peau. Il lisse les rides, soutient les articulations et favorise la beauté des cheveux et des ongles, pour un éclat naturel et durable.",
    features: null,
    image: collageneImage,
  },
  {
    id: "brule-graisses",
    tabLabel: "Brûle-graisses",
    eyebrow: "BRÛLE-GRAISSES",
    title: "Brûle-graisses naturel",
    titleAccent: null,
    description:
      "Complément alimentaire à base de thé vert, guarana et maté, conçu pour accompagner la gestion du poids. Il aide à augmenter la dépense énergétique et à favoriser la combustion des graisses, dans le cadre d'un mode de vie sain.",
    features: null,
    image: bruleGraissesImage,
  },
  {
    id: "coupe-faim",
    tabLabel: "Coupe-faim",
    eyebrow: "COUPE-FAIM",
    title: "Coupe-faim naturel",
    titleAccent: "Perte de poids",
    description:
      "Complément alimentaire à base de konjac, riche en glucomannane, conçu pour accompagner la perte de poids en aidant à limiter la sensation de faim, dans le cadre d'un régime hypocalorique et d'un mode de vie sain.",
    features: null,
    image: coupeFaimImage,
  },
];

const TRUST_LINE =
  "Livraison offerte dès 60€ · Paiement sécurisé · Satisfait ou remboursé";

export function ProductShowcase() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active =
    CATEGORIES.find((category) => category.id === activeId) ?? CATEGORIES[0];

  return (
    <section
      id="produits"
      className="scroll-mt-32 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-black/10 pb-px">
          {CATEGORIES.map((category) => {
            const isActive = category.id === activeId;
            return (
              <button
                aria-pressed={isActive}
                className={`-mb-px border-b-2 pb-3 text-sm tracking-wide transition-colors ${
                  isActive
                    ? "border-[#a77d38] text-[#171715]"
                    : "border-transparent text-[#040404] hover:text-[#171715]"
                }`}
                key={category.id}
                onClick={() => setActiveId(category.id)}
                type="button"
              >
                {category.tabLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-[#f1ede4]">
            <Image
              alt={active.title}
              className="object-cover"
              fill
              priority
              src={active.image}
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-xs font-medium tracking-[0.2em] text-[#0e3827]">
              {active.eyebrow}
            </p>

            <h2 className=" text-4xl leading-[0.98] tracking-[-0.02em] text-[#171715] sm:text-5xl">
              {active.title}
              {active.titleAccent ? (
                <>
                  <br />
                  <span className=" text-[#aa6a12]">{active.titleAccent}</span>
                </>
              ) : null}
            </h2>

            <span className="h-px w-10 bg-[#a77d38]" />

            <p className="max-w-md text-sm leading-relaxed text-[#000000] sm:text-base">
              {active.description}
            </p>

            {active.features ? (
              <p className="text-xs tracking-[0.08em] font-bold font-serif text-[#0e3827]">
                {active.features.join(" · ")}
              </p>
            ) : null}

            <Link
              href="/boutique"
              className="mt-1 inline-flex w-fit items-center gap-3 rounded-sm bg-[#0e3927] px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] sm:text-sm"
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
