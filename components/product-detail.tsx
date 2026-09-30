"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Leaf,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import type { ShopifyProductDetail } from "@/lib/shopify";
import { useCartStore } from "@/lib/store/use-cart";
import { useFavoritesStore } from "@/lib/store/use-favorites";
import { useCanOrder } from "@/components/can-order-provider";

const TIERS = [
  { days: 15, period: "15 jours", multiplier: 1, discount: 0, badge: null },
  {
    days: 30,
    period: "30 jours",
    multiplier: 2,
    discount: 0.05,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 45,
    period: "45 jours",
    multiplier: 3,
    discount: 0.1,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 60,
    period: "60 jours",
    multiplier: 4,
    discount: 0.15,
    badge: "OFFRE PREMIUM",
  },
] as const;

const ANTI_CHUTE_TIERS = [
  { days: 30, period: "1 mois", multiplier: 1, discount: 0, badge: null },
  {
    days: 60,
    period: "2 mois",
    multiplier: 2,
    discount: 0,
    price: 73.98,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 90,
    period: "3 mois",
    multiplier: 3,
    discount: 0,
    price: 107.97,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 120,
    period: "4 mois",
    multiplier: 4,
    discount: 0,
    price: 139.96,
    badge: "OFFRE PREMIUM",
  },
] as const;

const FAT_BURNER_TIERS = [
  { days: 15, period: "15 jours", multiplier: 1, discount: 0, price: 39.9, badge: null },
  {
    days: 30,
    period: "30 jours",
    multiplier: 2,
    discount: 0,
    price: 77.8,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 45,
    period: "45 jours",
    multiplier: 3,
    discount: 0,
    price: 113.7,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 60,
    period: "60 jours",
    multiplier: 4,
    discount: 0,
    price: 147.6,
    badge: "OFFRE PREMIUM",
  },
] as const;

const COLLAGEN_TIERS = [
  { days: 30, period: "1 mois", multiplier: 1, discount: 0, price: 35.99, badge: null },
  {
    days: 60,
    period: "2 mois",
    multiplier: 2,
    discount: 0,
    price: 69.98,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 90,
    period: "3 mois",
    multiplier: 3,
    discount: 0,
    price: 103.97,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 120,
    period: "4 mois",
    multiplier: 4,
    discount: 0,
    price: 131.96,
    badge: "OFFRE PREMIUM",
  },
] as const;

const APPETITE_SUPPRESSANT_TIERS = [
  { days: 15, period: "15 jours", multiplier: 1, discount: 0, price: 29.99, badge: null },
  {
    days: 30,
    period: "30 jours",
    multiplier: 2,
    discount: 0,
    price: 57.98,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 45,
    period: "45 jours",
    multiplier: 3,
    discount: 0,
    price: 83.97,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 60,
    period: "60 jours",
    multiplier: 4,
    discount: 0,
    price: 107.96,
    badge: "OFFRE PREMIUM",
  },
] as const;

const HARMONY_LOVE_TIERS = [
  { days: 30, period: "1 mois", multiplier: 1, discount: 0, price: 74, badge: null },
  {
    days: 60,
    period: "2 mois",
    multiplier: 2,
    discount: 0,
    price: 146,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 90,
    period: "3 mois",
    multiplier: 3,
    discount: 0,
    price: 216,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 120,
    period: "4 mois",
    multiplier: 4,
    discount: 0,
    price: 284,
    badge: "OFFRE PREMIUM",
  },
] as const;

const WEIGHT_LOSS_PACK_TIERS = [
  { days: 15, period: "15 jours", multiplier: 1, discount: 0, price: 68.99, badge: null },
  {
    days: 30,
    period: "30 jours",
    multiplier: 2,
    discount: 0,
    price: 129.98,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 45,
    period: "45 jours",
    multiplier: 3,
    discount: 0,
    price: 196.97,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 60,
    period: "60 jours",
    multiplier: 4,
    discount: 0,
    price: 257.96,
    badge: "OFFRE PREMIUM",
  },
] as const;

const ONE_MONTH_WEIGHT_LOSS_PACK_TIERS = [
  { days: 30, period: "Acheter 1", multiplier: 1, discount: 0, price: 129.99, badge: null },
  {
    days: 60,
    period: "Acheter 2",
    multiplier: 2,
    discount: 0,
    price: 257.98,
    badge: "MEILLEURE AFFAIRE",
  },
  {
    days: 90,
    period: "Acheter 3",
    multiplier: 3,
    discount: 0,
    price: 383.97,
    badge: "LE PLUS POPULAIRE",
  },
  {
    days: 120,
    period: "Acheter 4",
    multiplier: 4,
    discount: 0,
    price: 507.96,
    badge: "OFFRE PREMIUM",
  },
] as const;

const DELIVERY_STEPS = [
  { icon: ShoppingBag, label: "Commandé", detail: "Sous 24-48h" },
  { icon: Truck, label: "Préparé", detail: "Sous 24-48h" },
  { icon: PackageCheck, label: "Livré", detail: "Sous 24-48h" },
];

function currencyFor(product: ShopifyProductDetail) {
  return product.priceRange.minVariantPrice.currencyCode;
}

function formatAmount(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function ProductDetail({ product }: { product: ShopifyProductDetail }) {
  const images = product.images.nodes;
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTier, setSelectedTier] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>("description");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const variantId = product.variants.nodes[0]?.id;
  const addItem = useCartStore((state) => state.addItem);
  const canOrder = useCanOrder();
  const isCartLoading = useCartStore((state) => state.isLoading);
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(product.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const baseAmount = Number(product.priceRange.minVariantPrice.amount);
  const currencyCode = currencyFor(product);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(
          !entry.isIntersecting && entry.boundingClientRect.top < 0,
        );
      },
      { threshold: 0 },
    );

    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  const tierPricing = useMemo(() => {
    const tiers =
      product.handle === "anti-chute-de-cheveux"
        ? ANTI_CHUTE_TIERS
        : product.handle === "bruleur-de-graisses-naturel"
          ? FAT_BURNER_TIERS
          : product.handle === "collagene-marin"
            ? COLLAGEN_TIERS
            : product.handle === "coupe-faim-naturel"
              ? APPETITE_SUPPRESSANT_TIERS
              : product.handle ===
                  "pack-harmony-love-collagene-marin-anti-chute-vegan"
                ? HARMONY_LOVE_TIERS
                : product.handle === "pack-perte-de-poids"
                  ? WEIGHT_LOSS_PACK_TIERS
                  : product.handle === "pack-perte-de-poids-1-mois"
                    ? ONE_MONTH_WEIGHT_LOSS_PACK_TIERS
                    : TIERS;

    return tiers.map((tier) => {
        const fullPrice = baseAmount * tier.multiplier;
        const finalPrice = "price" in tier ? tier.price : fullPrice * (1 - tier.discount);
        return { ...tier, fullPrice, finalPrice, hasDiscount: finalPrice < fullPrice };
      });
  }, [baseAmount, product.handle]);

  const activeTier = tierPricing[selectedTier];

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10 sm:py-14 lg:px-[5.8vw]">
      <nav className="mb-8 flex items-center gap-1.5 text-xs text-[#8a8478]">
        <Link className="hover:text-[#171715]" href="/boutique">
          Boutique
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-[#171715]">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f1ede4]">
            {images.length ? (
              <Image
                alt={images[activeImage]?.altText ?? product.title}
                className="object-cover"
                fill
                priority
                src={images[activeImage].url}
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Leaf
                  aria-hidden="true"
                  className="size-16 text-[#a77d38]/40"
                  strokeWidth={1}
                />
              </div>
            )}
          </div>

          {images.length > 1 ? (
            <div className="flex gap-3">
              {images.map(
                (
                  image: { url: string; altText: string | null },
                  index: number,
                ) => (
                  <button
                    aria-label={`Voir l'image ${index + 1}`}
                    aria-pressed={index === activeImage}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:size-20 ${
                      index === activeImage
                        ? "border-[#a77d38]"
                        : "border-transparent"
                    }`}
                    key={image.url}
                    onClick={() => setActiveImage(index)}
                    type="button"
                  >
                    <Image
                      alt={image.altText ?? product.title}
                      className="object-cover"
                      fill
                      src={image.url}
                    />
                  </button>
                ),
              )}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          {product.productType ? (
            <p className="font-roboto text-xs font-medium tracking-[0.2em] text-[#a77d38]">
              {product.productType.toUpperCase()}
            </p>
          ) : null}

          <div className="flex items-start justify-between gap-4">
            <h1 className="font-roboto text-4xl leading-[0.98] tracking-[-0.02em] text-[#171715] sm:text-5xl">
              {product.title}
            </h1>
            <button
              aria-label={
                isFavorite
                  ? `Retirer ${product.title} des favoris`
                  : `Ajouter ${product.title} aux favoris`
              }
              aria-pressed={isFavorite}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#a77d38]/30 text-[#1a2e22] transition-transform hover:scale-105"
              onClick={() => toggleFavorite(product.id)}
              type="button"
            >
              <Heart
                className="size-4"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-[#a77d38]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  className="size-4"
                  fill="currentColor"
                  key={index}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="font-roboto text-sm text-[#8a8478]">
              4.8 · +120 avis
            </span>
          </div>

          <span className="h-px w-10 bg-[#a77d38]" />

          <div className="flex items-baseline gap-3">
            <span className="font-roboto text-3xl font-semibold text-[#171715]">
              {formatAmount(activeTier.finalPrice, currencyCode)}
            </span>
            {activeTier.hasDiscount ? (
              <span className="font-roboto text-base text-[#8a8478] line-through">
                {formatAmount(activeTier.fullPrice, currencyCode)}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-roboto text-xs font-semibold uppercase tracking-[0.12em] text-[#171715]">
              Achetez plus, économisez plus
            </p>
            <div className="grid grid-cols-2 gap-3">
              {tierPricing.map((tier, index) => (
                <button
                  aria-pressed={selectedTier === index}
                    className={`relative flex min-h-20 flex-col gap-0.5 rounded-lg border px-3 py-3 text-left transition-colors sm:px-4 ${
                    selectedTier === index
                      ? "border-[#0e3927] bg-[#0e3927]/5"
                      : "border-[#a77d38]/30 hover:border-[#a77d38]"
                  }`}
                  key={tier.days}
                  onClick={() => setSelectedTier(index)}
                  type="button"
                >
                  {tier.badge ? (
                    <span className="absolute -top-3 left-1/2 w-max max-w-[calc(100%-0.5rem)] -translate-x-1/2 rounded-full bg-[#171715] px-2 py-1 text-center font-roboto text-[9px] font-semibold leading-tight tracking-wide text-white sm:text-[10px]">
                      {tier.badge}
                    </span>
                  ) : null}
                  <span className="font-roboto text-sm font-semibold text-[#171715]">
                    {tier.period}
                  </span>
                  <span className="font-roboto text-xs text-[#585750]">
                    {formatAmount(tier.finalPrice, currencyCode)}
                    {tier.hasDiscount ? (
                      <span className="ml-1 text-[#8a8478] line-through">
                        {formatAmount(tier.fullPrice, currencyCode)}
                      </span>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-1 inline-flex items-center justify-center gap-3 rounded-sm bg-[#0e3927] px-6 py-3.5 font-roboto text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] disabled:opacity-50 sm:text-sm"
            disabled={!variantId || isCartLoading || !canOrder}
            onClick={() =>
              variantId && addItem(variantId, activeTier.multiplier)
            }
            ref={ctaRef}
            type="button"
          >
            <ShoppingBag className="size-4" />
            {canOrder ? "AJOUTER AU PANIER" : "RUPTURE DE STOCK"}
          </button>

          {canOrder ? null : (
            <p className="font-inter text-xs text-red-600">
              Ce produit n&apos;est pas disponible dans votre pays.
            </p>
          )}

          <p className="flex items-center gap-1.5 whitespace-nowrap font-inter text-[10px] text-[#8a8478] sm:text-xs">
            <ShieldCheck className="size-3.5 shrink-0 text-[#a77d38]" />
            Livraison offerte dès 70€ · Paiement sécurisé · Satisfait ou
            remboursé
          </p>

          <div className="mt-2 flex items-center justify-between border-t border-[#a77d38]/20 pt-6">
            {DELIVERY_STEPS.map((step, index) => (
              <div
                className="flex flex-1 flex-col items-center gap-2 text-center"
                key={step.label}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-[#0e3927] text-white">
                  <step.icon className="size-4" />
                </div>
                <span className="font-roboto text-xs font-semibold text-[#171715]">
                  {step.label}
                </span>
                <span className="font-inter text-[11px] text-[#8a8478]">
                  {step.detail}
                </span>
                {index < DELIVERY_STEPS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-px w-full bg-[#a77d38]/20 sm:block"
                  />
                ) : null}
              </div>
            ))}
          </div>

          {product.descriptionHtml ? (
            <div className="mt-2 overflow-hidden rounded-2xl border border-[#a77d38]/20 bg-[#faf8f4]">
              <button
                aria-expanded={openSection === "description"}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#a77d38]/5"
                onClick={() =>
                  setOpenSection(
                    openSection === "description" ? null : "description",
                  )
                }
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0e3927] text-[#e2c589]">
                    <Leaf
                      className="size-4"
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  </span>
                  <span className="font-roboto text-sm font-semibold tracking-wide text-[#171715]">
                    Description
                  </span>
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 text-[#a77d38] transition-transform duration-300 ${
                    openSection === "description" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openSection === "description"
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mx-5 mb-5 h-px bg-linear-to-r from-[#a77d38]/40 via-[#a77d38]/10 to-transparent" />
                  <div
                    className="px-5 pb-6 font-inter text-[15px] leading-7 text-[#585750] [&_a]:text-[#a77d38] [&_a]:underline [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:font-roboto [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#171715] [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:font-roboto [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-[#171715] [&_li]:mb-1.5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-[#171715] [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}

        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#a77d38]/20 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
          showStickyBar && canOrder ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-3 sm:px-10 lg:px-[5.8vw]">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-[#f1ede4] sm:size-14">
            {images.length ? (
              <Image
                alt={product.title}
                className="object-cover"
                fill
                src={images[0].url}
              />
            ) : null}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-roboto text-sm font-semibold text-[#171715]">
              {product.title}
            </span>
            <span className="font-roboto text-sm text-[#585750]">
              {formatAmount(activeTier.finalPrice, currencyCode)}
              {activeTier.multiplier > 1 ? (
                <span className="ml-1 text-xs text-[#a77d38]">
                  (× {activeTier.multiplier} · {activeTier.period})
                </span>
              ) : null}
            </span>
          </div>

          <button
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-[#0e3927] px-4 py-2.5 font-roboto text-xs font-semibold tracking-[0.06em] text-white transition-colors hover:bg-[#0a2c1c] disabled:opacity-50 sm:px-6 sm:py-3"
            disabled={!variantId || isCartLoading}
            onClick={() =>
              variantId && addItem(variantId, activeTier.multiplier)
            }
            type="button"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">COMMANDER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
