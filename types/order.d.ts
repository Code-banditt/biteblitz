export type OrderItem = {
  pizzaId: string; // just a string ID
  name: string;
  quantity: number;
  price: number;
};

// Main order type
export type OrderType = {
  _id?: string;
  userId?: string;
  address?: string;
  items: OrderItem[];
  total: number;
  isConfirmed: boolean;
  confirmedAt?: Date;
  riderName?: string; // assigned when order is confirmed
  status: "pending" | "confirmed" | "on-the-way" | "delivered";
  createdAt?: Date;
  updatedAt?: Date;
};
