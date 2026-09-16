"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ anchors: true });
    let frameId: number;

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
      lenis.destroy();
    };
  }, []);

  return null;
}
