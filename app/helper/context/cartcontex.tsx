"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const CartDrawerContext = createContext<any>(null);

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CartDrawerContext.Provider>
  );
}

export const useCartDrawer = () => useContext(CartDrawerContext);
