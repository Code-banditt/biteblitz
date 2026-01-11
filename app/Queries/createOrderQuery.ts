import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderType } from "@/types/order";

// --------------------
// CREATE ORDER
// POST /Routes/orders
// --------------------
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderType, Error, Partial<OrderType>>({
    mutationFn: async (orderData) => {
      const res = await fetch("/Routes/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to create order");
      return res.json() as Promise<OrderType>;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// --------------------
// GET ORDER BY ID
// GET /Routes/orders/[id]
// --------------------
export const useGetOrderById = (id: string) => {
  return useQuery<OrderType, Error>({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await fetch(`/Routes/order/${id}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      return res.json() as Promise<OrderType>;
    },
  });
};

// --------------------
// CONFIRM ORDER
// PATCH /Routes/orders/[id]
// --------------------
export const useConfirmOrder = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<OrderType, Error, { address: string }>({
    mutationFn: async ({ address }) => {
      const res = await fetch(`/Routes/order/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (!res.ok) throw new Error("Failed to confirm order");
      return res.json() as Promise<OrderType>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });
};

export const useGetOrdersByUser = (userId: string) => {
  return useQuery<OrderType[], Error>({
    queryKey: ["orders", userId],
    queryFn: async () => {
      const res = await fetch(`/Routes/order/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: !!userId, // don't run until userId exists
  });
};
