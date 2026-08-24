import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou plus sur Harmony Cure.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <section className="flex flex-1 items-center justify-center bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center">
          <Leaf
            className="size-8 rotate-18 text-[#a77d38]"
            fill="currentColor"
            strokeWidth={1.1}
          />

          <p className="text-xs font-medium tracking-[0.2em] text-[#a77d38]">
            ERREUR 404
          </p>

          <h1 className="font-heading text-5xl leading-[0.98] tracking-[-0.02em] text-[#171715] sm:text-6xl">
            Cette page s&apos;est <span className="text-[#aa6a12]">égarée</span>
          </h1>

          <span className="h-px w-10 bg-[#a77d38]" />

          <p className="max-w-sm text-sm leading-relaxed text-[#585750] sm:text-base">
            Le lien que vous avez suivi ne mène à rien, ou la page a été
            déplacée. Retournez à l&apos;accueil ou découvrez nos cures
            naturelles.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#0e3927] px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0e3927]/90 sm:text-sm"
            >
              RETOUR À L&apos;ACCUEIL
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#0e3927]/15 px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-[#0e3927] transition-colors hover:border-[#a77d38] hover:text-[#a77d38] sm:text-sm"
            >
              VOIR LA BOUTIQUE
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
