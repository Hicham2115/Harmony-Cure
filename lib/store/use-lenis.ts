"use client";

import { create } from "zustand";
import type Lenis from "lenis";

type LenisState = {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis | null) => void;
};

export const useLenisStore = create<LenisState>((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
}));
