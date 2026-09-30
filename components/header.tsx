"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Heart, Leaf, Menu, ShoppingBag } from "lucide-react";

import logo from "@/app/assets/logo.webp";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDrawer } from "@/components/cart-drawer";
import { FavoritesDrawer } from "@/components/favorites-drawer";
import { useCartStore } from "@/lib/store/use-cart";
import { useFavoritesStore } from "@/lib/store/use-favorites";

const NAV_LINKS = [
  { label: "Boutique", href: "/boutique" },
  { label: "Soins", href: "/#produits" },
  { label: "Cheveux", href: "/#resultats" },
  { label: "À propos", href: "/#histoire" },
  { label: "Avis", href: "/#avis" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);
  const openFavorites = useFavoritesStore((state) => state.openFavorites);
  const cartCount = useCartStore((state) => state.cart?.totalQuantity ?? 0);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative flex items-center justify-center gap-1.5 bg-[#0d3825] px-2.5 py-1.5 text-center text-[9px] font-medium uppercase tracking-[0.02em] text-white sm:gap-2 sm:px-12 sm:py-2.5 sm:text-xs sm:tracking-[0.16em]">
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Leaf
            className="size-2.5 shrink-0 sm:size-3.5"
            fill="currentColor"
            strokeWidth={1.2}
          />
          <span className="leading-tight font-inter">
            Livraison gratuite à partir de 70€ — Ne ratez pas l’offre !
          </span>
        </span>
        {/* <button
          className="group absolute right-4 hidden items-center gap-1 text-xs tracking-[0.14em] text-white/90 transition-colors duration-300 hover:text-[#e2c589] sm:inline-flex sm:right-10"
          type="button"
        >
          FR{" "}
          <ChevronDown className="size-3 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button> */}
      </div>

      <div className="relative flex items-center justify-between gap-2 border-b border-black/5 bg-white px-4 py-2.5 sm:gap-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10 lg:px-[5.5vw]">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger
              render={
              <Button
                aria-label="Ouvrir le menu"
                className="rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38] md:hidden"
                size="icon"
                variant="ghost"
              >
                <Menu className="size-5" />
              </Button>
            }
            />
            <SheetContent
              className="w-[82%] max-w-sm border-r border-[#b68b43]/25 bg-[#fffdf8] px-5"
              side="left"
            >
              <SheetHeader className="border-b border-[#0e3927]/10 px-0 pb-5 pt-4">
                <SheetTitle className="font-heading text-2xl tracking-wide text-[#0e3927]">
                  Harmony Cure
                </SheetTitle>
                <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-[#a77d38]">
                  La beauté au naturel
                </p>
              </SheetHeader>
              <nav className="flex flex-col gap-1 pt-5">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        className="rounded-xl px-4 py-3.5 font-inter text-base font-medium text-[#1a2e22] transition-colors hover:bg-[#f7f3eb] hover:text-[#a77d38]"
                        href={link.href}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center whitespace-nowrap md:static md:translate-x-0"
            aria-label="Harmony Cure, accueil"
          >
            <Image
              alt="Harmony Cure"
              className="h-9 w-auto origin-left scale-150 sm:h-11 sm:scale-[1.7]"
              priority
              src={logo}
            />
          </Link>
        </div>

        {/* Middle: nav */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-6">
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
          {/* <Button
            aria-label="Rechercher"
            className="group rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38]"
            size="icon"
            variant="ghost"
          >
            <Search className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </Button> */}
          {/* <Button
            aria-label="Compte"
            className="hidden rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38] sm:inline-flex"
            size="icon"
            variant="ghost"
          >
            <User className="size-5" />
          </Button> */}
          <Button
            aria-label="Favoris"
            className="group relative hidden rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38] sm:inline-flex"
            onClick={openFavorites}
            size="icon"
            variant="ghost"
          >
            <Heart className="size-5 transition-transform duration-300 group-hover:fill-current" />
            {favoriteCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#1a3d2e] text-[10px] text-white transition-colors duration-300">
                {favoriteCount}
              </span>
            ) : null}
          </Button>
          <Button
            aria-label="Panier"
            className="relative rounded-full text-[#1a2e22] transition-all duration-300 hover:scale-105 hover:text-[#a77d38]"
            onClick={openCart}
            size="icon"
            variant="ghost"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#1a3d2e] text-[10px] text-white transition-colors duration-300">
              {cartCount}
            </span>
          </Button>
        </div>
      </div>

      <CartDrawer />
      <FavoritesDrawer />
    </header>
  );
}
