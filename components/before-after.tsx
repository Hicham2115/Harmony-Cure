"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Heart,
  Leaf,
  Sparkles,
  Sprout,
} from "lucide-react";

import comparisonImage from "@/app/assets/anti_chute.webp";

const FEATURES = [
  {
    icon: Leaf,
    title: "Formules naturelles",
    description: "Ingrédients d'origine végétale",
  },
  {
    icon: Sprout,
    title: "Stimule la croissance",
    description: "Active la pousse naturelle",
  },
  {
    icon: Droplets,
    title: "Hydrate & nourrit",
    description: "Cuir chevelu sain, cheveux forts",
  },
  {
    icon: Sparkles,
    title: "Résultats visibles",
    description: "Plus de densité, plus de brillance",
  },
];

const TRUST_ITEMS = [
  { icon: Sprout, label: "Testé dermatologiquement" },
  { icon: Heart, label: "Convient à tous types de cheveux" },
  { icon: Leaf, label: "Sans silicones ni parabènes" },
];

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  return (
    <section className="relative overflow-hidden bg-[#f3ede2] py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-6 bg-white [clip-path:polygon(0_0,100%_0,100%_45%,0_100%)] sm:h-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-6 bg-white [clip-path:polygon(0_55%,100%_0,100%_100%,0_100%)] sm:h-10"
      />

      <div className="relative mx-auto grid max-w-[1600px] items-start gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-[5.8vw]">
        <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#a77d38]">
            <Leaf className="size-4" strokeWidth={1.2} />
            RÉSULTATS VISIBLES
          </p>

          <h2 className="font-heading text-5xl leading-[1.05] text-[#171715] sm:text-6xl">
            Avant &amp; <span className="italic text-[#aa6a12]">Après</span>
          </h2>

          <div className="flex items-center gap-3 text-[#a77d38]">
            <span className="h-px w-10 bg-current" />
            <Leaf className="size-4" strokeWidth={1.2} />
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#3f403b] sm:text-base">
            Nos formules 100% naturelles, enrichies en actifs végétaux
            sélectionnés, stimulent la croissance des cheveux, renforcent les
            racines et hydratent le cuir chevelu pour des cheveux plus denses,
            plus sains et visiblement brillants.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left"
                key={title}
              >
                <Icon
                  className="size-6 text-[#1a2e22]"
                  strokeWidth={1.25}
                />
                <h3 className="text-xs font-bold uppercase leading-snug tracking-wide text-[#171715]">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-[#6b675e]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-[0_14px_36px_rgba(42,34,22,0.1)]">
          <div
            className="relative aspect-4/3 w-full touch-none select-none overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            ref={containerRef}
          >
            <Image
              alt="Après"
              className="object-cover"
              fill
              priority
              src={comparisonImage}
            />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                alt="Avant"
                className="object-cover grayscale contrast-75 brightness-90"
                fill
                priority
                src={comparisonImage}
              />
            </div>

            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#171715]">
              Avant
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#171715]">
              Après
            </span>

            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
              style={{ left: `${position}%` }}
            />
            <div
              className="pointer-events-none absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#171715] shadow-md"
              style={{ left: `${position}%` }}
            >
              <ChevronLeft className="size-3.5" />
              <ChevronRight className="-ml-1.5 size-3.5" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 bg-[#f6f1e8] px-6 py-4 sm:justify-between">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div className="flex items-center gap-2" key={label}>
                <Icon className="size-4 text-[#a77d38]" strokeWidth={1.5} />
                <span className="text-xs text-[#3f403b]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
