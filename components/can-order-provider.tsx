"use client";

import { createContext, useContext } from "react";

const CanOrderContext = createContext(true);

export function CanOrderProvider({
  canOrder,
  children,
}: {
  canOrder: boolean;
  children: React.ReactNode;
}) {
  return (
    <CanOrderContext.Provider value={canOrder}>
      {!canOrder ? (
        <div
          aria-live="polite"
          className="bg-[#f7f2e8] px-4 py-2 text-center font-inter text-xs text-[#0e3927] sm:text-sm"
          role="status"
        >
          Vous pouvez consulter nos produits, mais la commande en ligne n&apos;est
          pas disponible dans votre pays.
        </div>
      ) : null}
      {children}
    </CanOrderContext.Provider>
  );
}

export function useCanOrder() {
  return useContext(CanOrderContext);
}
