// app/AuthProvider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { CartDrawerProvider } from "./helper/context/cartcontex";
import PageTransition from "./_Components/pageTransition";

const queryClient = new QueryClient();

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartDrawerProvider>
        <PageTransition />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CartDrawerProvider>
    </SessionProvider>
  );
}
