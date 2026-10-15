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
    title: "Livraison offerte dès 70€",
    description: "Profitez de la livraison offerte dès 70€ d'achat.",
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

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-7 lg:px-[4vw]">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#e0c88a]">
            <Leaf className="size-3.5" strokeWidth={1.2} />
            NOS ENGAGEMENTS
          </p>

          <h2 className="font-heading text-4xl leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl">
            Une promesse de <span className=" text-[#e0c88a]">qualité</span>
          </h2>

          <span className="h-px w-10 bg-[#a77d38]" />

          <p className="text-base leading-relaxed text-white/90 sm:text-lg">
            Des formules exigeantes, fabriquées en France, pensées pour durer.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-2">
          {GUARANTEES.map(({ title, description }) => (
            <div
              className="group flex min-h-[260px] flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#194a37] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e0c88a]/45 hover:bg-[#1c503d] sm:p-7"
              key={title}
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-[#e0c88a]/75 bg-[#0e3927]/60 text-[#e0c88a] transition-transform duration-300 group-hover:scale-105">
                <Check className="size-7" strokeWidth={1.8} />
              </div>
              <h3 className="max-w-[28rem] text-base font-bold uppercase leading-snug tracking-[0.08em] text-white">
                {title}
              </h3>
              <p className="max-w-[19rem] text-[15px] leading-7 text-white/80">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
