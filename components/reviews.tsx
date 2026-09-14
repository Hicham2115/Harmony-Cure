"use client";

import { useRef, useState } from "react";
import { Play, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const REVIEWS = [
  { name: "@asmabaklouti", product: "Harmony Cure", video: "/videos/reviews/asmabaklouti-1.mp4" },
  { name: "@asmabaklouti", product: "Harmony Cure", video: "/videos/reviews/asmabaklouti-2.mp4" },
  { name: "@asmabaklouti", product: "Harmony Cure", video: "/videos/reviews/asmabaklouti-3.mp4" },
  { name: "@asmabaklouti", product: "Harmony Cure", video: "/videos/reviews/asmabaklouti-4.mp4" },
  { name: "@fatine_in_paris", product: "Harmony Cure", video: "/videos/reviews/fatine-1.mp4" },
  { name: "@fatine_in_paris", product: "Harmony Cure", video: "/videos/reviews/fatine-2.mp4" },
  { name: "@fatine_in_paris", product: "Harmony Cure", video: "/videos/reviews/fatine-3.mp4" },
  { name: "@fatine_in_paris", product: "Harmony Cure", video: "/videos/reviews/fatine-4.mp4" },
  { name: "@fatine_in_paris", product: "Harmony Cure", video: "/videos/reviews/fatine-5.mp4" },
  { name: "@imenbourguiba_", product: "Harmony Cure", video: "/videos/reviews/imen-1.mp4" },
  { name: "@imenbourguiba_", product: "Harmony Cure", video: "/videos/reviews/imen-2.mp4" },
  { name: "@imenbourguiba_", product: "Harmony Cure", video: "/videos/reviews/imen-3.mp4" },
  { name: "Cliente vérifiée", product: "Harmony Cure", video: "/videos/reviews/general-1.mp4" },
  { name: "Cliente vérifiée", product: "Harmony Cure", video: "/videos/reviews/general-2.mp4" },
  { name: "Cliente vérifiée", product: "Harmony Cure", video: "/videos/reviews/general-3.mp4" },
  { name: "Cliente vérifiée", product: "Harmony Cure", video: "/videos/reviews/general-4.mp4" },
  { name: "Cliente vérifiée", product: "Pack HarmonyLove", video: "/videos/reviews/pack-love-1.mp4" },
  { name: "Cliente vérifiée", product: "Pack HarmonyLove", video: "/videos/reviews/pack-love-2.mp4" },
  { name: "Cliente vérifiée", product: "Pack HarmonyLove", video: "/videos/reviews/pack-love-3.mp4" },
  { name: "Cliente vérifiée", product: "Pack HarmonyLove", video: "/videos/reviews/pack-love-4.mp4" },
  { name: "Cliente vérifiée", product: "Pack Brûleur de Graisse", video: "/videos/reviews/pack-bruleur-1.mp4" },
  { name: "Cliente vérifiée", product: "Pack Brûleur de Graisse", video: "/videos/reviews/pack-bruleur-2.mp4" },
];

function ReviewCard({ name, product, video }: (typeof REVIEWS)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.controls = true;
    void el.play();
    setIsPlaying(true);
  };

  return (
    <div className="group relative aspect-9/16 overflow-hidden rounded-2xl border border-[#a77d38]/20 bg-linear-to-b from-[#ece3d3] to-[#ddd0b6] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a77d38]/50 hover:shadow-xl">
      <video
        className="absolute inset-0 size-full object-cover"
        loop
        muted
        onClick={!isPlaying ? handlePlay : undefined}
        playsInline
        preload="metadata"
        ref={videoRef}
        src={video}
      />

      {!isPlaying && (
        <button
          aria-label="Lire la vidéo"
          className="absolute inset-0 flex items-center justify-center"
          onClick={handlePlay}
          type="button"
        >
          <span className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/25" />
          <span className="relative flex size-14 items-center justify-center rounded-full bg-white/90 text-[#171715] shadow-md transition-transform duration-300 group-hover:scale-110">
            <Play className="size-5 fill-current" strokeWidth={0} />
          </span>
        </button>
      )}

      {!isPlaying && (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#171715]">
            {name}
          </div>
          <div className="flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-1 text-[#a77d38]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star className="size-2.5" fill="currentColor" key={index} strokeWidth={0} />
            ))}
          </div>
        </div>
      )}

      {!isPlaying && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/25 to-transparent p-4 pt-14 transition-transform duration-300 group-hover:-translate-y-0.5">
          <p className="text-xs uppercase tracking-wide text-white/80">{product}</p>
        </div>
      )}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-[#a77d38]">
            AVIS CLIENTES
          </p>

          <h2 className="font-heading text-4xl leading-[0.98] tracking-[-0.02em] text-[#171715] sm:text-5xl">
            Elles <span className=" text-[#aa6a12]">témoignent</span>
          </h2>

          <span className="h-px w-10 bg-[#a77d38]" />

          <p className="text-sm leading-relaxed text-[#585750] sm:text-base">
            Des retours authentiques de notre communauté, en vidéo.
          </p>

          <div className="mt-1 flex items-center gap-2.5">
            <div className="flex items-center gap-0.5 text-[#a77d38]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  className="size-4"
                  fill="currentColor"
                  key={index}
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#171715]">4.9/5</span>
            <span className="text-sm text-[#8a8478]">
              · 1 200+ avis vérifiés
            </span>
          </div>
        </div>

        <Carousel
          className="mt-12 sm:mt-16"
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent>
            {REVIEWS.map((review, index) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4"
                key={`${review.video}-${index}`}
              >
                <ReviewCard {...review} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-4 hidden border-[#a77d38]/30 bg-white text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:border-[#a77d38] hover:bg-white hover:text-[#a77d38] sm:-left-5 sm:flex" />
          <CarouselNext className="-right-4 hidden border-[#a77d38]/30 bg-white text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:border-[#a77d38] hover:bg-white hover:text-[#a77d38] sm:-right-5 sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
