import { ArrowRight, Leaf, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const INFO_ROWS = [
  {
    label: "Email",
    value: "harmonycuree@gmail.com",
    href: "mailto:harmonycuree@gmail.com",
  },
  {
    label: "Disponibilité",
    value: "Lun. – ven., 9h – 18h",
    sub: "Réponse sous 24 à 48h ouvrées",
  },
];

function TicketDivider({
  orientation,
}: {
  orientation: "vertical" | "horizontal";
}) {
  if (orientation === "vertical") {
    return (
      <div className="relative hidden w-px shrink-0 lg:block">
        <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-[#0e3927]/25" />
        <span className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 rounded-full border border-[#0e3927]/12 bg-white" />
        <span className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 rounded-full border border-[#0e3927]/12 bg-white" />
      </div>
    );
  }

  return (
    <div className="relative h-px lg:hidden">
      <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-[#0e3927]/25" />
      <span className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full border border-[#0e3927]/12 bg-white" />
      <span className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full border border-[#0e3927]/12 bg-white" />
    </div>
  );
}

export function Contact() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[5.8vw]">
        <div className="relative rounded-[1.75rem] border border-[#0e3927]/12 bg-[#f8f4ec] shadow-[0_24px_70px_-24px_rgba(14,57,39,0.22)]">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div className="flex flex-col gap-6 p-8 sm:p-10 lg:basis-[42%] lg:p-12">
              <span className="flex size-14 rotate-[-8deg] items-center justify-center rounded-full border-4 border-double border-[#e2c589] bg-[#0e3927] text-[#e2c589]">
                <Leaf className="size-5" fill="currentColor" strokeWidth={1} />
              </span>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium tracking-[0.2em] text-[#a77d38]">
                  FICHE CONSEIL
                </p>
                <h2 className="font-heading text-3xl leading-[1.05] tracking-[-0.01em] text-[#171715] sm:text-4xl">
                  Parlons de votre{" "}
                  <span className="text-[#aa6a12]">harmonie</span>
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-[#585750] sm:text-base">
                  Une question sur une cure, votre commande ou vos résultats ?
                  Écrivez-nous : une conseillère vous répond en personne.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {INFO_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-3 border-b border-dotted border-[#0e3927]/25 pb-2"
                  >
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#585750]">
                      {row.label}
                    </span>
                    <span className="text-right">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="text-sm font-medium text-[#171715] transition-colors hover:text-[#a77d38]"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-[#171715]">
                          {row.value}
                        </span>
                      )}
                      {row.sub && (
                        <span className="block text-[11px] text-[#585750]/80">
                          {row.sub}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:harmonycuree@gmail.com"
                className="mt-1 inline-flex w-fit items-center gap-2.5 rounded-sm bg-[#0e3927] px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0e3927]/90 sm:text-sm"
              >
                <Mail className="size-3.5" strokeWidth={2} />
                NOUS ÉCRIRE
              </a>
            </div>

            <TicketDivider orientation="vertical" />
            <TicketDivider orientation="horizontal" />

            <div className="flex flex-col gap-6 p-8 sm:p-10 lg:basis-[58%] lg:p-12">
              <form className="flex flex-1 flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-first-name"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#585750]"
                    >
                      Prénom
                    </label>
                    <Input
                      id="contact-first-name"
                      placeholder="Votre prénom"
                      className="h-auto rounded-none border-0 border-b border-[#0e3927]/20 bg-transparent px-0 pb-2 text-[#171715] shadow-none placeholder:text-[#585750]/40 focus-visible:border-[#a77d38] focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-last-name"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#585750]"
                    >
                      Nom
                    </label>
                    <Input
                      id="contact-last-name"
                      placeholder="Votre nom"
                      className="h-auto rounded-none border-0 border-b border-[#0e3927]/20 bg-transparent px-0 pb-2 text-[#171715] shadow-none placeholder:text-[#585750]/40 focus-visible:border-[#a77d38] focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-[#585750]"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="vous@exemple.com"
                    className="h-auto rounded-none border-0 border-b border-[#0e3927]/20 bg-transparent px-0 pb-2 text-[#171715] shadow-none placeholder:text-[#585750]/40 focus-visible:border-[#a77d38] focus-visible:ring-0"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-[#585750]"
                  >
                    Votre message
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Parlez-nous de votre routine ou de votre question..."
                    className="min-h-28 flex-1 resize-none rounded-none border-0 border-b border-[#0e3927]/20 bg-transparent px-0 py-2 text-[#171715] shadow-none placeholder:text-[#585750]/40 focus-visible:border-[#a77d38] focus-visible:ring-0"
                  />
                </div>

                <div className="flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <p className="max-w-xs text-[11px] leading-relaxed text-[#585750]/80">
                    En envoyant ce message, vous acceptez d&apos;être
                    recontactée par notre équipe.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-[#0e3927] px-6 py-3.5 text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0e3927]/90 sm:text-sm"
                  >
                    ENVOYER MA DEMANDE
                    <ArrowRight className="size-3.5" strokeWidth={2} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
