import { Play, Star } from "lucide-react";

const REVIEWS = [
  { name: "Camille", product: "Sérum Pousse Cheveux", rating: 5 },
  { name: "Léa", product: "Collagène Marin", rating: 5 },
  { name: "Manon", product: "Masque Nutrition", rating: 5 },
  { name: "Sophie", product: "Anti-Chute Vegan", rating: 4 },
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
            Elles <span className="italic text-[#aa6a12]">témoignent</span>
          </h2>

          <span className="h-px w-10 bg-[#a77d38]" />

          <p className="text-sm leading-relaxed text-[#585750] sm:text-base">
            Des retours authentiques de notre communauté, en vidéo.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-4">
          {REVIEWS.map((review) => (
            <div
              className="group relative aspect-9/16 overflow-hidden rounded-2xl bg-[#f1ede4]"
              key={review.name}
            >
              {/* Placeholder — replace with a <video> element once footage is added */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-white/90 text-[#171715] shadow-md transition-transform group-hover:scale-105">
                  <Play className="size-5 fill-current" strokeWidth={0} />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent p-4 pt-12">
                <div className="flex items-center gap-0.5 text-[#e8c76b]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      className="size-3"
                      fill={index < review.rating ? "currentColor" : "none"}
                      key={index}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm font-semibold text-white">
                  {review.name}
                </p>
                <p className="text-xs text-white/70">{review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
