import { headers } from "next/headers";

// Countries covered by the Shopify shipping zones: France, Belgium + Italy, Canada, EU.
const SHIPPING_COUNTRY_CODES = new Set([
  "FR", "BE", "IT", "CA",
  "AT", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "DE", "GR", "HU", "IE",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);

// Vercel sets this header at the edge. When it's missing (local dev), don't block the sale.
// In development only, MOCK_VISITOR_COUNTRY (e.g. "MA") fakes the visitor's country.
export async function canOrderFromVisitorCountry() {
  const mockCountry =
    process.env.NODE_ENV === "development"
      ? process.env.MOCK_VISITOR_COUNTRY
      : undefined;
  const country = mockCountry ?? (await headers()).get("x-vercel-ip-country");
  if (!country) return true;
  return SHIPPING_COUNTRY_CODES.has(country.toUpperCase());
}

export async function assertVisitorCanOrder() {
  if (!(await canOrderFromVisitorCountry())) {
    throw new Error("Nous ne livrons pas encore dans votre pays.");
  }
}
