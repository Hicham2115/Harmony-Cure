const legacyAdminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
const adminClientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const adminClientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

let cachedAccessToken: string | undefined;
let cachedAccessTokenExpiresAt = 0;

function getShopDomain() {
  const configuredDomain =
    process.env.SHOPIFY_ADMIN_API_DOMAIN ?? process.env.SHOPIFY_STORE_DOMAIN;
  if (!configuredDomain) {
    throw new Error(
      "Set SHOPIFY_ADMIN_API_DOMAIN to your Shopify *.myshopify.com domain in .env.",
    );
  }

  let domainUrl: URL;
  try {
    domainUrl = new URL(
      configuredDomain.includes("://")
        ? configuredDomain
        : `https://${configuredDomain}`,
    );
  } catch {
    throw new Error("SHOPIFY_ADMIN_API_DOMAIN is not a valid Shopify domain.");
  }

  if (!domainUrl.hostname.endsWith(".myshopify.com")) {
    throw new Error(
      "Set SHOPIFY_ADMIN_API_DOMAIN to your Shopify *.myshopify.com domain in .env.",
    );
  }

  return domainUrl.hostname;
}

function getAdminApiUrl() {
  return `https://${getShopDomain()}/admin/api/2026-07/graphql.json`;
}

async function getAdminAccessToken() {
  if (!adminClientId || !adminClientSecret) {
    if (legacyAdminAccessToken) return legacyAdminAccessToken;
    throw new Error(
      "Set SHOPIFY_ADMIN_API_CLIENT_ID and SHOPIFY_ADMIN_API_CLIENT_SECRET in .env.",
    );
  }

  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt - 60_000) {
    return cachedAccessToken;
  }

  const response = await fetch(
    `https://${getShopDomain()}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: adminClientId,
        client_secret: adminClientSecret,
      }),
    },
  );

  const result = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    scope?: string;
  };

  if (!response.ok || !result.access_token || !result.expires_in) {
    throw new Error(`Shopify Admin API authentication failed: ${response.status}`);
  }

  const scopes = result.scope?.split(",").map((scope) => scope.trim()) ?? [];
  if (!scopes.includes("write_draft_orders")) {
    throw new Error(
      "The Shopify app token is missing the write_draft_orders permission. Reinstall the app and approve its latest permissions.",
    );
  }

  cachedAccessToken = result.access_token;
  cachedAccessTokenExpiresAt = Date.now() + result.expires_in * 1000;
  return cachedAccessToken;
}

export async function shopifyAdminRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<{ data?: T; errors?: unknown }> {
  const response = await fetch(getAdminApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": await getAdminAccessToken(),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Admin API request failed: ${response.status}`);
  }

  return response.json();
}
