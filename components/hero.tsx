import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import heroImage from "@/app/assets/hero.png";

const TRUST_BADGES = [
  { icon: Leaf, label: "Naturel & sain" },
  { icon: ShieldCheck, label: "Made in France" },
  { icon: FlaskConical, label: "Sans ingrédients nocifs" },
  { icon: Sparkles, label: "Cruelty free" },
];

const PROMISES = [
  {
    icon: Leaf,
    title: "Formules naturelles",
    description:
      "Ingrédients soigneusement sélectionnés pour leur efficacité et leur douceur.",
  },
  {
    icon: FlaskConical,
    title: "Expertise & qualité",
    description: "Des soins développés avec exigence, fabriqués en France.",
  },
  {
    icon: Droplets,
    title: "Résultats visibles",
    description:
      "Des formules efficaces pour des résultats visibles et durables.",
  },
  {
    icon: Sparkles,
    title: "Expérience sensorielle",
    description:
      "Textures délicates, parfums subtils, moments de bien-être uniques.",
  },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="bg-[#f7f3eb] pb-8 sm:hidden">
        <div className="relative mx-4 aspect-[16/9] overflow-hidden rounded-b-[2rem] border-x border-b border-[#b68b43] bg-[#f7f3eb]">
          <Image
            alt="Produits Harmony Cure"
            className="object-cover object-center"
            fill
            priority
            sizes="calc(100vw - 2rem)"
            src={heroImage}
          />
          <span className="absolute left-0 top-8 rounded-r-full bg-[#b68b43] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            Soins · France
          </span>
        </div>
        <div className="relative -mt-8 mx-4 rounded-t-[2rem] bg-[#0e3927] px-6 pb-7 pt-12 text-white shadow-[0_-12px_35px_rgba(14,57,39,0.16)]">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0c88a]">
            La beauté au naturel
          </p>
          <span className="mt-4 block h-px w-12 bg-[#e0c88a]" />
          <h1 className="mt-5 font-heading text-[clamp(2.5rem,12vw,4rem)] leading-[0.95] tracking-[-0.03em] text-[#fffaf0]">
            La Beauté
            <br />
            En Harmonie
            <br />
            <span className="text-[#e0c88a]">Avec la Nature</span>
          </h1>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/75">
            Des soins naturels et sensoriels, pensés pour révéler durablement
            votre beauté, jour après jour.
          </p>
          <Link
            href="/boutique"
            className="mt-7 inline-flex w-full items-center justify-between rounded-full bg-[#fff7e8] px-5 py-4 font-roboto text-xs font-semibold tracking-[0.08em] text-[#0e3927]"
          >
            DÉCOUVRIR LA BOUTIQUE
            <ArrowRight className="size-5 text-[#b68b43]" />
          </Link>
        </div>
      </div>

      <div className="relative hidden min-h-[620px] grid-cols-[42%_58%] bg-white sm:grid lg:min-h-[700px]">
        <div className="relative z-10 flex flex-col justify-center px-10 py-16 lg:px-[5.8vw]">
          <p className="flex items-center gap-3 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-[#b68b43]">
            <span className="h-px w-9 bg-current" />
            Soins naturels · Made in France
          </p>
          <h1 className="mt-7 max-w-xl font-heading text-[clamp(3.5rem,5.2vw,5.5rem)] leading-[0.92] tracking-[-0.04em] text-[#171715]">
            La Beauté
            <br />
            En Harmonie
            <br />
            <span className="text-[#b68b43]">Avec la Nature</span>
          </h1>
          <p className="mt-8 max-w-md font-heading text-xl leading-relaxed text-[#585750] lg:text-2xl">
            Des soins naturels et sensoriels, pensés pour révéler durablement
            votre beauté, jour après jour.
          </p>
          <Link
            href="/boutique"
            className="mt-9 inline-flex w-fit items-center gap-5 rounded-full bg-[#0e3927] px-7 py-4 font-roboto text-sm font-semibold tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
          >
            DÉCOUVRIR LA BOUTIQUE
            <ArrowRight className="size-5 text-[#e0c88a]" />
          </Link>
        </div>
        <div className="relative m-4 overflow-visible rounded-[2rem] border-2 border-[#b68b43] lg:m-6">
          <Image
            alt="Produits Harmony Cure"
            className="rounded-[1.8rem] object-cover object-right"
            fill
            priority
            sizes="58vw"
            src={heroImage}
          />
          <div className="absolute -left-7 top-16 flex size-28 items-center justify-center rounded-full border-2 border-[#a9782f] bg-[radial-gradient(circle_at_35%_25%,#f2d28a_0%,#d2a64e_58%,#bc8834_100%)] p-1.5 text-center shadow-[0_10px_20px_rgba(38,29,14,0.2)] lg:-left-8">
            <span className="flex size-full flex-col items-center justify-center rounded-full border border-[#f8dfa0]/90 px-3 text-[#332614] shadow-[inset_0_0_0_1px_rgba(120,78,20,0.35)]">
              <Leaf className="mb-0.5 size-4 -rotate-12 text-[#70501e]" strokeWidth={1.5} />
              <span className="font-heading text-[11px] uppercase leading-none tracking-[0.08em]">
                Fabriqué
              </span>
              <span className="my-2 flex h-[3px] w-16 overflow-hidden">
                <i className="w-1/3 bg-[#1d4775]" />
                <i className="w-1/3 bg-[#f8f1df]" />
                <i className="w-1/3 bg-[#b7343e]" />
              </span>
              <span className="font-heading text-[10px] uppercase leading-none tracking-[0.08em]">
                En France
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* <div className="relative z-20 mx-auto -mt-6 max-w-[1450px] px-4 pb-5 sm:px-8 lg:-mt-14 lg:px-0">
        <div className="grid overflow-hidden rounded-xl bg-white shadow-[0_14px_36px_rgba(42,34,22,0.12)] md:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ icon: Icon, title, description }) => (
            <article
              className="flex gap-3 border-[#d8cec0] px-5 py-4 last:border-0 md:border-r lg:px-6"
              key={title}
            >
              <Icon
                className="mt-1 size-6 shrink-0 text-[#96703c]"
                strokeWidth={1.25}
              />
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#262722]">
                  {title}
                </h2>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#585750]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div> */}
    </section>
  );
}
