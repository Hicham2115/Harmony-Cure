import { headers } from "next/headers";

const AFRICAN_COUNTRY_CODES = new Set([
  "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV",
  "DJ", "DZ", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ",
  "GW", "KE", "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU",
  "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL",
  "SN", "SO", "SS", "ST", "SZ", "TD", "TG", "TN", "TZ", "UG", "YT",
  "ZA", "ZM", "ZW",
]);

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
  const requestHeaders = await headers();
  const country =
    mockCountry ??
    requestHeaders.get("cf-ipcountry") ??
    requestHeaders.get("x-vercel-ip-country");
  const continent = requestHeaders.get("x-vercel-ip-continent");

  if (!mockCountry && continent?.trim().toUpperCase() === "AF") return false;
  if (!country) return true;

  const countryCode = country.trim().toUpperCase();
  if (AFRICAN_COUNTRY_CODES.has(countryCode)) return false;

  return SHIPPING_COUNTRY_CODES.has(countryCode);
}

export async function assertVisitorCanOrder() {
  if (!(await canOrderFromVisitorCountry())) {
    throw new Error("Nous ne livrons pas encore dans votre pays.");
  }
}
