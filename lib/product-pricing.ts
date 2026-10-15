export const COLLAGEN_TIER_TOTALS = [35.99, 69.98, 103.97, 131.96] as const;
export const ANTI_CHUTE_TIER_TOTALS = [37.99, 73.98, 107.97, 139.96] as const;
export const APPETITE_SUPPRESSANT_TIER_TOTALS = [29.99, 57.98, 83.97, 107.96] as const;
export const FAT_BURNER_TIER_TOTALS = [39.9, 77.8, 113.7, 147.6] as const;
export const WEIGHT_LOSS_PACK_TIER_TOTALS = [68.99, 129.98, 196.97, 257.96] as const;
export const ONE_MONTH_WEIGHT_LOSS_PACK_TIER_TOTALS = [129.99, 257.98, 383.97, 507.96] as const;
export const HARMONY_LOVE_TIER_TOTALS = [72.99, 146, 216, 284] as const;

const HARMONY_LOVE_HANDLE = "pack-harmony-love-collagene-marin-anti-chute-vegan";

const COLLAGEN_HANDLES = [
  "collagene-marin-enrichi-en-vitamine-c-et-acide-hyaluronique",
  "collagene-marin",
];
const ANTI_CHUTE_HANDLES = [
  "anti-chute-de-cheveux",
  "complement-alimentaire-vegan-anti-chute-de-cheveux",
];
const APPETITE_SUPPRESSANT_HANDLES = [
  "coupe-faim-naturel",
  "coupe-faim-naturel-perte-de-poids",
];

export function getProductTierTotal(handle: string, quantity: number) {
  if (!Number.isInteger(quantity)) return null;
  if (COLLAGEN_HANDLES.includes(handle)) {
    return COLLAGEN_TIER_TOTALS[quantity - 1] ?? null;
  }
  if (ANTI_CHUTE_HANDLES.includes(handle)) {
    return ANTI_CHUTE_TIER_TOTALS[quantity - 1] ?? null;
  }
  if (handle === HARMONY_LOVE_HANDLE) {
    return HARMONY_LOVE_TIER_TOTALS[quantity - 1] ?? null;
  }
  if (APPETITE_SUPPRESSANT_HANDLES.includes(handle)) {
    return APPETITE_SUPPRESSANT_TIER_TOTALS[quantity - 1] ?? null;
  }
  if (handle === "bruleur-de-graisses-naturel" || handle === "brule-graisses") {
    return FAT_BURNER_TIER_TOTALS[quantity - 1] ?? null;
  }
  if (handle === "pack-perte-de-poids") {
    return WEIGHT_LOSS_PACK_TIER_TOTALS[quantity - 1] ?? null;
  }
  if (handle === "pack-perte-de-poids-1-mois") {
    return ONE_MONTH_WEIGHT_LOSS_PACK_TIER_TOTALS[quantity - 1] ?? null;
  }
  return null;
}

export function isCollagenProduct(handle: string) {
  return COLLAGEN_HANDLES.includes(handle);
}

export function isAppetiteSuppressantProduct(handle: string) {
  return APPETITE_SUPPRESSANT_HANDLES.includes(handle);
}

export function getCollagenTierTotal(handle: string, quantity: number) {
  return isCollagenProduct(handle) ? getProductTierTotal(handle, quantity) : null;
}
