"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AnalyticsEvent, getShopifyAnalytics } from "@/lib/shopify-analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageKey = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    getShopifyAnalytics()?.publish(AnalyticsEvent.PAGE_VIEWED);
  }, [pageKey]);

  return null;
}
