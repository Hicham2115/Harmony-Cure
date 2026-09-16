"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { useLenisStore } from "@/lib/store/use-lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ anchors: true });
    let frameId: number;

    useLenisStore.getState().setLenis(lenis);

    function raf(time: number) {
      try {
        lenis.raf(time);
      } finally {
        frameId = requestAnimationFrame(raf);
      }
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      useLenisStore.getState().setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
