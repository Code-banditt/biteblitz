// app/clientProviders.tsx
"use client";

import { Toaster } from "sonner";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "bg-yellow-400 text-black border border-yellow-400 shadow-xl",
        }}
        closeButton
      />
    </>
  );
}
