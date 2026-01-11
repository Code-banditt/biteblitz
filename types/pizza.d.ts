interface PizzaSize {
  size: "small" | "medium" | "large";
  price: number;
}

interface Pizza {
  _id: string;
  name: string;
  description: string;
  image: string;
  sizes: PizzaSize[];
  toppings?: string[];
  category: "veg" | "non-veg";
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export type { Pizza, PizzaSize };
