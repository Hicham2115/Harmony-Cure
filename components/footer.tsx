import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, Mail, Share2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { PAYMENT_METHODS } from "@/components/payment-icons";
import logo from "@/app/assets/logo.webp";

const SHOP_LINKS = [
  { label: "Boutique", href: "/boutique" },
  { label: "Soins", href: "/#produits" },
  { label: "Cheveux", href: "/#resultats" },
  { label: "À propos", href: "/#histoire" },
];

const HELP_LINKS = [
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: Share2, label: "Facebook", href: "https://facebook.com" },
  { icon: Mail, label: "Email", href: "mailto:harmonycuree@gmail.com" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="group inline-flex items-center text-base text-white/85 transition-colors hover:text-[#e2c589]"
      href={href}
    >
      <span className="mr-0 h-px w-0 bg-[#e2c589] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0e3927] pb-2">
      <div className="mx-auto max-w-[1600px] px-6 pt-10 sm:px-10 lg:px-[5.8vw]">
        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="flex items-center whitespace-nowrap"
                aria-label="Harmony Cure, accueil"
              >
                <Image
                  alt="Harmony Cure"
                  className="h-9 w-auto origin-left scale-150 invert sm:h-11 sm:scale-[1.7]"
                  src={logo}
                />
              </Link>

              <p className="max-w-xs text-base leading-relaxed text-white/85">
                Des soins naturels, efficaces et sensoriels, fabriqués en France
                pour révéler durablement votre beauté.
              </p>

              <div className="mt-1 flex items-center gap-3">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:scale-110 hover:border-[#e2c589] hover:bg-[#e2c589]/10 hover:text-[#e2c589]"
                    href={href}
                    key={label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon className="size-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#e2c589]">
                Boutique
              </h3>
              <ul className="flex flex-col gap-2.5">
                {SHOP_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#e2c589]">
                Aide
              </h3>
              <ul className="flex flex-col gap-2.5">
                {HELP_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#e2c589]">
                Restez informée
              </h3>
              <p className="text-base leading-relaxed text-white/85">
                Nos nouveautés, conseils et offres directement dans votre boîte
                mail.
              </p>
              <form className="flex items-center gap-2">
                <Input
                  aria-label="Adresse email"
                  className="h-11 border-white/20 bg-white/5 text-base text-white placeholder:text-base placeholder:text-white/50 focus-visible:border-[#e2c589] focus-visible:ring-[#e2c589]/30"
                  placeholder="Votre email"
                  type="email"
                />
                <button
                  aria-label="S'inscrire"
                  className="group flex size-11 shrink-0 items-center justify-center rounded-md bg-[#e2c589] text-[#0e3927] transition-colors hover:bg-[#f0d9a5]"
                  type="submit"
                >
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 border-t border-white/10 pt-6 sm:justify-start">
            {PAYMENT_METHODS.map(({ label, Mark }) => (
              <span
                className="flex h-8 min-w-14 items-center justify-center rounded-md border border-white/10 bg-white px-3"
                key={label}
                title={label}
              >
                <Mark />
              </span>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} Harmony Cure. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mt-4 select-none text-center font-serif leading-none font-medium whitespace-nowrap text-white/5 sm:-mt-6"
        style={{ fontSize: "12vw" }}
      >
        HARMONY CURE
      </div>

      <p className="mx-auto max-w-[1440px] px-6 py-4 text-center text-[12px] text-white/70 sm:px-8 lg:px-12">
        Designed &amp; developed by{" "}
        <a
          href="https://www.stallionadvertising.ma/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline mb-20 decoration-transparent underline-offset-2 transition-colors duration-200 hover:text-white hover:decoration-teal-400"
        >
          Stallion Advertising
        </a>
      </p>
    </footer>
  );
}
