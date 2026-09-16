"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useLenisStore } from "@/lib/store/use-lenis";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = useLenisStore.getState().lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
