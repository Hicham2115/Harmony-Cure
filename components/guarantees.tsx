import { Check, Leaf } from "lucide-react";

const GUARANTEES = [
  {
    title: "Produits naturels",
    description:
      "Nos formules 100 % naturelles, enrichies en actifs végétaux sélectionnés, stimulent la croissance, renforcent les racines et hydratent le cuir chevelu.",
  },
  {
    title: "Laboratoire pharmaceutique",
    description:
      "Nos produits sont fabriqués en France dans des laboratoires pharmaceutiques, respectant des normes strictes de qualité et de sécurité.",
  },
  {
    title: "Fabrication française",
    description:
      "Tous nos produits sont fabriqués en France, garantissant qualité, expertise et savoir-faire local à chaque étape de leur fabrication.",
  },
  {
    title: "Livraison dans le monde",
    description:
      "Nous proposons la livraison internationale afin que nos produits de qualité vous parviennent facilement, où que vous soyez dans le monde.",
  },
];

export function Guarantees() {
  return (
    <section className="relative overflow-hidden bg-[#0e3927] py-20 sm:py-28">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-10 w-full text-white sm:h-16"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M0,60 C300,120 900,0 1200,60 L1200,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-10 w-full text-white sm:h-16"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M0,60 C300,0 900,120 1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#e0c88a]">
            <Leaf className="size-3.5" strokeWidth={1.2} />
            NOS ENGAGEMENTS
          </p>

          <h2 className="font-heading text-4xl leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl">
            Une promesse de <span className=" text-[#e0c88a]">qualité</span>
          </h2>

          <span className="h-px w-10 bg-[#a77d38]" />

          <p className="text-sm leading-relaxed text-white/90 sm:text-base">
            Des formules exigeantes, fabriquées en France, pensées pour durer.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map(({ title, description }) => (
            <div
              className="flex flex-col rounded-lg bg-white/5 items-center gap-4 p-10 text-center transition-transform duration-300 hover:-translate-y-1"
              key={title}
            >
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#a77d38] text-[#a77d38]">
                <Check className="size-6" strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold uppercase leading-snug tracking-wide text-white">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
