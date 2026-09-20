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
      {children}
    </CanOrderContext.Provider>
  );
}

export function useCanOrder() {
  return useContext(CanOrderContext);
}
