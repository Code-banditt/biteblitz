"use client";

import { CartItem } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function GetCart(userId: string) {
  const res = await fetch(`/Routes/cart/Crud?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to load cart");
  return res.json();
}

export function useGetCart() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => (userId ? GetCart(userId) : Promise.resolve({ items: [] })),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCart() {
  const queryClient = useQueryClient();

  return useMutation<CartItem, Error, CartItem>({
    mutationFn: async (item: CartItem) => {
      const res = await fetch("/Routes/cart/Crud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed to add item to cart");
      return res.json();
    },
    onSuccess: () => {
      // Refetch cart after adding an item
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { itemId: string }>({
    mutationFn: async ({ itemId }) => {
      const res = await fetch(`/Routes/cart/Crud/${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove item from cart");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { userId: string }>({
    mutationFn: async ({ userId }) => {
      const res = await fetch(`/Routes/cart/Crud/${userId}`, {
        method: "DELETEALL",
      });
      if (!res.ok) {
        throw new Error("Failed to clear cart");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
