import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
      <video
        aria-hidden="true"
        className="absolute inset-0 z-0 size-full object-cover object-[62%_center] lg:object-[68%_center]"
        src="/videos/hero.mp4"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/56 to-white/10 sm:via-white/35 sm:to-white/5 lg:from-white lg:via-white/5 lg:to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-110 max-w-[1600px] items-center px-6 py-16 sm:px-10 sm:py-20 lg:min-h-110 lg:px-[5.8vw] lg:py-28">
        <div className="flex max-w-lg flex-col gap-5 sm:max-w-xl lg:max-w-6xl lg:gap-6">
          <p className="flex items-center gap-3 text-[19px] font-semibold tracking-[0.2em] text-[#000000] sm:text-xs">
            <span className="h-px w-9  bg-current" />
            <Leaf
              className="size-3 shrink-0 sm:size-3.5"
              strokeWidth={1.2}
            />{" "}
            SOINS NATURELS &amp; MADE IN FRANCE
          </p>

          <h1 className="font-heading text-4xl leading-[1.15] tracking-[-0.01em] text-[#171715] sm:text-5xl sm:leading-[1.1] lg:text-[88px] lg:leading-[1.05]">
            La Beauté En
            <br />
            <span className="mt-1 inline-block sm:mt-2">Harmonie Avec</span>
            <br />
            <span className="mt-1 inline-block text-[#aa6a12] sm:mt-2">
              La Nature
            </span>
          </h1>

          <p className="max-w-lg text-sm leading-relaxed text-[#010101] sm:text-lg">
            Des soins naturels et sensoriels, pensés pour révéler durablement
            votre beauté, jour après jour.
          </p>

          <Link
            href="/boutique"
            className="mt-1 inline-flex w-fit items-center gap-4 rounded-sm bg-[#0e3927] px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-white transition-colors sm:text-sm"
          >
            DÉCOUVRIR LA BOUTIQUE
            <ArrowRight className="size-4" />
          </Link>

          {/* <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#a77d38]/25 pt-4 sm:mt-6 sm:gap-x-9 sm:pt-5">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-[#128f5b]" strokeWidth={1.5} />
                <span className="font-heading text-[11px] tracking-[0.03em] font-semibold text-[#000000] sm:text-[13px]">
                  {label}
                </span>
              </div>
            ))}
          </div> */}
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
