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
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
};

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    const loadPixelIfAllowed = () => {
      const privacy = window.Shopify?.customerPrivacy;
      if (!privacy?.marketingAllowed()) return;

      if (!window.fbq) {
        const queued = ((...args: unknown[]) => {
          if (queued.callMethod) queued.callMethod(...args);
          else queued.queue?.push(args);
        }) as QueuedFbq;
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
  parameters?: Record<string, string | number>,
) {
  if (
    typeof window !== "undefined" &&
    window.Shopify?.customerPrivacy?.marketingAllowed() &&
    typeof window.fbq === "function"
  ) {
    window.fbq("track", eventName, parameters);
  }
}
