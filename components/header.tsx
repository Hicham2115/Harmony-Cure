import Link from "next/link";
import {
  ChevronDown,
  Heart,
  Leaf,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NAV_LINKS = [
  { label: "Boutique", href: "/boutique" },
  { label: "Soins", href: "/soins" },
  { label: "Cheveux", href: "/cheveux" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative  flex items-center justify-center gap-2 bg-[#0d3825] px-4 py-2 text-center text-[9px] font-medium uppercase tracking-[0.1em] text-white sm:px-12 sm:py-2.5 sm:text-[10px] sm:tracking-[0.16em] lg:text-xs">
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Leaf
            className="size-3 shrink-0 sm:size-3.5"
            fill="currentColor"
            strokeWidth={1.2}
          />
          <span className="leading-tight">
            Livraison offerte dès 60€ d&apos;achat en France métropolitaine
          </span>
        </span>
        <button
          className="group absolute right-4 hidden items-center gap-1 text-[10px] tracking-[0.14em] text-white/90 transition-colors duration-300 hover:text-[#e2c589] sm:inline-flex sm:right-10"
          type="button"
        >
          FR{" "}
          <ChevronDown className="size-3 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>

      <div className="grid py-5 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-black/5 bg-white px-4 py-3 sm:gap-4 sm:px-6 md:px-10 lg:px-[5.5vw]">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                aria-label="Ouvrir le menu"
                className="rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38] md:hidden"
                size="icon"
                variant="ghost"
              >
                <Menu className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {NAV_LINKS.map((link) => (
                    <NavigationMenuItem className="w-full" key={link.href}>
                      <NavigationMenuLink
                        className="w-full py-1.5 text-sm"
                        href={link.href}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <Link
            href="/"
            className="flex items-center gap-1.5 whitespace-nowrap text-[#1c1d1a] sm:gap-2"
            aria-label="Harmony Cure, accueil"
          >
            <Leaf
              className="size-5 shrink-0 rotate-[18deg] text-[#a77d38] sm:size-6"
              fill="currentColor"
              strokeWidth={1.1}
            />
            <span className="font-serif text-base tracking-[0.1em] sm:text-lg sm:tracking-[0.16em] lg:text-lg">
              HARMONY CURE
            </span>
          </Link>
        </div>

        {/* Middle: nav */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-8">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  className="group/navlink relative rounded-none bg-transparent p-0 text-sm font-medium tracking-wide text-[#1a2e22] transition-[color,letter-spacing] duration-300 hover:bg-transparent hover:tracking-[0.04em] hover:text-[#a77d38] focus:bg-transparent"
                  href={link.href}
                >
                  {link.label.toUpperCase()}
                  <span className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[#a77d38] transition-all duration-300 ease-out group-hover/navlink:w-full" />
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex items-center justify-end gap-0.5 text-[#1a2e22] sm:gap-1 lg:gap-3">
          <Button
            aria-label="Rechercher"
            className="group rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38]"
            size="icon"
            variant="ghost"
          >
            <Search className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </Button>
          <Button
            aria-label="Compte"
            className="hidden rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38] sm:inline-flex"
            size="icon"
            variant="ghost"
          >
            <User className="size-5" />
          </Button>
          <Button
            aria-label="Favoris"
            className="group hidden rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38] sm:inline-flex"
            size="icon"
            variant="ghost"
          >
            <Heart className="size-5 transition-transform duration-300 group-hover:fill-current" />
          </Button>
          <Button
            aria-label="Panier"
            className="relative rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38]"
            size="icon"
            variant="ghost"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#1a3d2e] text-[10px] text-white transition-colors duration-300">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
