export interface CartItem {
  PizzaName: string;
  pizzaId: string;
  size: string;
  price: number;
  quantity: number;
  toppings?: string[];
  image?: string;
  _id?: string;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}
