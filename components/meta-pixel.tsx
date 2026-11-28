"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: Window["fbq"];
  }
}

const pixelId = "911641041329943";
type QueuedFbq = NonNullable<Window["fbq"]> & {
  callMethod?: (...args: unknown[]) => void;
  push?: unknown;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
};

function isMarketingAllowed() {
  const privacy = window.Shopify?.customerPrivacy;
  // Shopify's consent banner doesn't work on localhost, so allow testing there.
  if (
    process.env.NODE_ENV !== "production" &&
    typeof privacy?.marketingAllowed !== "function"
  ) {
    return true;
  }
  return (
    typeof privacy?.marketingAllowed === "function" &&
    privacy.marketingAllowed()
  );
}

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    const loadPixelIfAllowed = () => {
      if (!isMarketingAllowed()) return;

      if (!window.fbq) {
        const queued = ((...args: unknown[]) => {
          if (queued.callMethod) queued.callMethod(...args);
          else queued.queue?.push(args);
        }) as QueuedFbq;
        queued.push = queued;
        queued.queue = [];
        queued.loaded = true;
        queued.version = "2.0";
        window.fbq = queued;
        window._fbq = queued;

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(script);
        window.fbq("init", pixelId);
      }

      window.fbq?.("track", "PageView");
    };

    loadPixelIfAllowed();
    document.addEventListener("consentTrackingApiLoaded", loadPixelIfAllowed);
    document.addEventListener("visitorConsentCollected", loadPixelIfAllowed);
    return () => {
      document.removeEventListener("consentTrackingApiLoaded", loadPixelIfAllowed);
      document.removeEventListener("visitorConsentCollected", loadPixelIfAllowed);
    };
  }, [pathname, query]);

  return null;
}

export function trackMetaPixelEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (
    typeof window !== "undefined" &&
    isMarketingAllowed() &&
    typeof window.fbq === "function"
  ) {
    window.fbq("track", eventName, parameters);
  }
}

export function trackMetaPixelCustomEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (
    typeof window !== "undefined" &&
    isMarketingAllowed() &&
    typeof window.fbq === "function"
  ) {
    window.fbq("trackCustom", eventName, parameters);
  }
}

// Meta hashes these values in the browser before sending them.
export function setMetaPixelUserData(data: {
  fullName?: string;
  phone?: string;
  email?: string;
}) {
  if (
    typeof window === "undefined" ||
    !isMarketingAllowed() ||
    typeof window.fbq !== "function"
  ) {
    return;
  }
  const [firstName, ...rest] = (data.fullName ?? "").trim().toLowerCase().split(/\s+/);
  const email = (data.email ?? "").trim().toLowerCase();
  const phone = (data.phone ?? "").replace(/\D/g, "");
  window.fbq("init", pixelId, {
    ...(firstName ? { fn: firstName } : {}),
    ...(rest.length ? { ln: rest.join(" ") } : {}),
    ...(phone ? { ph: phone } : {}),
    ...(email ? { em: email } : {}),
  });
}
