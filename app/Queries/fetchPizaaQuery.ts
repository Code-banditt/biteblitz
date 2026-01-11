"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchPizzas() {
  const res = await fetch("/Routes/pizza/Crud");
  if (!res.ok) throw new Error("Failed to load pizzas");
  return res.json();
}

export function usePizzas() {
  return useQuery({
    queryKey: ["pizzas"],
    queryFn: fetchPizzas,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
