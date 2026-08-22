import Link from "next/link";
import { ArrowRight, Camera, Leaf, Mail, Share2 } from "lucide-react";

import { Input } from "@/components/ui/input";

const SHOP_LINKS = [
  { label: "Boutique", href: "/boutique" },
  { label: "Soins", href: "/soins" },
  { label: "Cheveux", href: "/cheveux" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
];

const HELP_LINKS = [
  { label: "Livraison & retours", href: "/livraison" },
  { label: "Suivi de commande", href: "/suivi-commande" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Confidentialité", href: "/confidentialite" },
];

const SOCIALS = [
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: Share2, label: "Facebook", href: "https://facebook.com" },
  { icon: Mail, label: "Email", href: "mailto:contact@harmonycure.fr" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="group inline-flex items-center text-sm text-white/75 transition-colors hover:text-white"
      href={href}
    >
      <span className="mr-0 h-px w-0 bg-[#e2c589] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0e3927] text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16 lg:px-[5.8vw]">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 whitespace-nowrap"
              aria-label="Harmony Cure, accueil"
            >
              <Leaf
                className="size-6 shrink-0 rotate-[18deg] text-[#e2c589]"
                fill="currentColor"
                strokeWidth={1.1}
              />
              <span className="font-serif text-lg tracking-[0.16em]">
                HARMONY CURE
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Des soins naturels, efficaces et sensoriels, fabriqués en
              France pour révéler durablement votre beauté.
            </p>

            <div className="mt-1 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:scale-110 hover:border-[#e2c589] hover:text-[#e2c589]"
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c589]">
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c589]">
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c589]">
              Restez informée
            </h3>
            <p className="text-sm leading-relaxed text-white/70">
              Nos nouveautés, conseils et offres directement dans votre
              boîte mail.
            </p>
            <form className="flex items-center gap-2">
              <Input
                aria-label="Adresse email"
                className="h-11 border-white/20 bg-white/10 text-sm text-white placeholder:text-white/50 focus-visible:border-[#e2c589] focus-visible:ring-[#e2c589]/30"
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

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/15 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Harmony Cure. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-xs text-white/60 transition-colors hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
