import { Play, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const REVIEWS = [
  {
    name: "Camille",
    product: "Sérum Pousse Cheveux",
    quote: "Mes cheveux n'ont jamais été aussi denses.",
    rating: 5,
  },
  {
    name: "Léa",
    product: "Collagène Marin",
    quote: "Ma peau est visiblement plus éclatante.",
    rating: 5,
  },
  {
    name: "Manon",
    product: "Masque Nutrition",
    quote: "Un parfum et une texture incroyables.",
    rating: 5,
  },
  {
    name: "Sophie",
    product: "Anti-Chute Vegan",
    quote: "La chute a nettement ralenti en un mois.",
    rating: 4,
  },
  {
    name: "Inès",
    product: "Shampooing Doux",
    quote: "Doux au quotidien, aucune irritation.",
    rating: 5,
  },
  {
    name: "Chloé",
    product: "Huile de Ricin",
    quote: "Mes sourcils et cils sont transformés.",
    rating: 5,
  },
];

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
            {REVIEWS.map((review) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4"
                key={review.name}
              >
                <div className="group relative aspect-9/16 overflow-hidden rounded-2xl border border-[#a77d38]/20 bg-linear-to-b from-[#ece3d3] to-[#ddd0b6] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a77d38]/50 hover:shadow-xl">
                  {/* Placeholder — replace with a <video> element once footage is added */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-white/90 text-[#171715] shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-5 fill-current" strokeWidth={0} />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <div className="flex size-8 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-[#171715]">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-1 text-[#a77d38]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          className="size-2.5"
                          fill={index < review.rating ? "currentColor" : "none"}
                          key={index}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/25 to-transparent p-4 pt-14 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <p className="text-sm font-semibold text-white">
                      {review.name}
                    </p>
                    <p className="text-xs italic text-white/80">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wide text-white/50">
                      {review.product}
                    </p>
                  </div>
                </div>
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
