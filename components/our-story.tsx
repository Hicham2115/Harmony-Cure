import { Leaf } from "lucide-react";

const MILESTONES = [
  {
    title: "Une conviction avant tout",
    text: "La beauté et le bien-être sont essentiels pour se sentir pleinement soi-même.",
  },
  {
    title: "Naissance des premiers produits",
    text: "L'Anti-Chute et le Collagène Marin, formulés bien avant que tout ne bascule.",
  },
  {
    title: "Un tournant inattendu",
    text: "Un diagnostic de sclérose en plaques fragilise mes cheveux et ma peau.",
  },
  {
    title: "Une force retrouvée",
    text: "Mes propres produits deviennent mon allié : vitalité, éclat, confiance.",
  },
  {
    title: "De l'intime à la mission",
    text: "Harmony Cure devient une mission : redonner espoir à toutes les femmes.",
  },
];

export function OurStory() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#a77d38]">
            <Leaf className="size-3.5" strokeWidth={1.2} />
            NOTRE HISTOIRE
          </p>

          <h2 className="font-heading text-4xl leading-[0.98] tracking-[-0.02em] text-[#171715] sm:text-5xl">
            À l&apos;origine d&apos;<span className="text-[#aa6a12]">Harmony Cure</span>
          </h2>

          <span className="h-px w-10 bg-[#a77d38]" />
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <p className="font-heading text-2xl leading-relaxed text-[#171715] italic sm:text-3xl">
            « Je suis à l&apos;origine d&apos;Harmony Cure, une marque née de mon
            propre parcours. Après avoir traversé une épreuve de santé qui a
            fragilisé mes cheveux et ma peau, j&apos;ai trouvé dans mes formules
            naturelles une force nouvelle. Aujourd&apos;hui, ma mission est
            simple&nbsp;: aider d&apos;autres femmes à retrouver confiance, éclat
            et harmonie dans leur vie quotidienne. »
          </p>
          <p className="mt-4 text-xs font-semibold tracking-[0.15em] text-[#a77d38] uppercase">
            — La fondatrice, Harmony Cure
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="absolute top-1.5 right-0 left-0 hidden h-px bg-[#0e3927]/15 sm:block" />

          <div className="grid gap-10 sm:grid-cols-5 sm:gap-6">
            {MILESTONES.map(({ title, text }) => (
              <div className="flex flex-col gap-3 text-center" key={title}>
                <span className="relative mx-auto size-3 shrink-0 rounded-full bg-[#0e3927]" />
                <h3 className="text-sm font-semibold text-[#171715]">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-[#585750]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-xl text-center sm:mt-20">
          <p className="font-heading text-3xl text-[#aa6a12] italic sm:text-4xl">
            « Prendre soin de soi, c&apos;est retrouver sa force et sa lumière. »
          </p>
        </div>
      </div>
    </section>
  );
}
