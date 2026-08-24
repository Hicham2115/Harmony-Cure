"use client";

import { useState } from "react";
import { ChevronDown, Leaf } from "lucide-react";

const FAQ_ITEMS = [
  {
    question:
      "Quand puis-je espérer voir les premiers résultats après avoir commencé à prendre ce pack ?",
    answer:
      "Les premiers résultats peuvent être visibles dès 4 semaines d'utilisation régulière. Vous pouvez constater une amélioration de l'hydratation et de la fermeté de la peau, ainsi qu'une réduction de la chute des cheveux. Pour des résultats optimaux, nous recommandons une cure de 3 mois, période durant laquelle la repousse capillaire et la fermeté de la peau seront plus significatives.",
  },
  {
    question:
      "Puis-je prendre les deux compléments ensemble dans une même journée ?",
    answer:
      "Oui, vous pouvez prendre les deux compléments ensemble. Il est recommandé de consommer le Collagène Marin (1 à 2 doses par jour) et le Complément Anti-Chute de Cheveux Vegan (2 capsules par jour) de préférence lors des repas, afin de maximiser leur absorption. Ces deux produits agissent en synergie pour une action complète sur la peau, les cheveux et les articulations.",
  },
  {
    question: "Ce pack convient-il à un régime végétalien ?",
    answer:
      "Le Complément Anti-Chute de Cheveux est 100% vegan, mais le Collagène Marin, comme son nom l'indique, est d'origine marine et n'est donc pas adapté à un régime végétalien strict. Si vous suivez un régime végétalien, vous pouvez opter uniquement pour le complément capillaire. Nous travaillons également sur des alternatives vegans pour nos produits à base de collagène.",
  },
  {
    question: "Ce pack est-il adapté à tous les types de cheveux et de peau ?",
    answer:
      "Oui, ce pack convient à tous les types de cheveux et de peau. Le Collagène Marin et l'Acide Hyaluronique sont bénéfiques pour hydrater et raffermir tous les types de peau, tandis que le Complément Anti-Chute de Cheveux Vegan est conçu pour améliorer la croissance et la santé des cheveux, qu'ils soient fins, épais, secs ou abîmés.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#a77d38]">
            <Leaf className="size-3.5" strokeWidth={1.2} />
            QUESTIONS FRÉQUENTES
          </p>

          <h2 className="font-heading text-4xl leading-[0.95] tracking-[-0.02em] text-[#171715] sm:text-5xl">
            Vous <span className=" text-[#aa6a12]">vous demandez</span>
          </h2>

          <span className="h-px w-10 bg-[#a77d38]" />

          <p className="text-sm leading-relaxed text-[#585750] sm:text-base">
            Tout ce qu'il faut savoir avant de commencer votre cure.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 sm:mt-16">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className="overflow-hidden rounded-xl border border-[#a77d38]/20 bg-[#faf8f4]"
                key={item.question}
              >
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="text-sm font-semibold text-[#171715] sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-[#a77d38] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#585750] sm:px-6 sm:pb-6 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
