import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BoutiqueGrid } from "@/components/boutique-grid";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez nos soins capillaires naturels, formulés et fabriqués en France : anti-chute, collagène marin, cures minceur.",
  alternates: {
    canonical: "/boutique",
  },
  openGraph: {
    title: "Boutique | Harmony Cure",
    description:
      "Découvrez nos soins capillaires naturels, formulés et fabriqués en France.",
    url: "https://harmonycure.fr/boutique",
    type: "website",
  },
};

export default function BoutiquePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <section className="bg-white pt-14 pb-8 sm:pt-20 sm:pb-10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-4 px-6 text-center sm:px-10 lg:px-[5.8vw]">
          <p className="text-xs font-medium tracking-[0.2em] text-[#a77d38]">
            LA BOUTIQUE
          </p>

          <h1 className="font-heading text-4xl leading-[0.98] tracking-[-0.02em] text-[#171715] sm:text-5xl">
            Nos essentiels <span className=" text-[#aa6a12]">capillaires</span>
          </h1>

          <span className="h-px w-10 bg-[#a77d38]" />

          <p className="max-w-lg text-sm leading-relaxed text-[#585750] sm:text-base">
            Des formules naturelles pensées pour chaque besoin, du cuir chevelu
            aux longueurs.
          </p>
        </div>
      </section>

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
          <BoutiqueGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
