const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

if (!storeDomain || !adminAccessToken) {
  throw new Error(
    "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_ACCESS_TOKEN in .env.local",
  );
}

const normalizedDomain = storeDomain
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

const ADMIN_API_URL = `https://${normalizedDomain}/admin/api/2026-07/graphql.json`;

export async function shopifyAdminRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<{ data?: T; errors?: unknown }> {
  const response = await fetch(ADMIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminAccessToken as string,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Admin API request failed: ${response.status}`);
  }

  return response.json();
}
