import mongoose from "mongoose";
import pizzaSchema from "@/models/pizzaSchema"; // your Pizza schema
import { connectDB } from "@/lib/mongoose"; // your connection utility

const pizzas = [
  {
    name: "Margherita",
    description: "Classic pizza with tomato, mozzarella, and fresh basil.",
    image:
      "https://images.unsplash.com/photo-1632221622104-06557f3eee3c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 5 },
      { size: "medium", price: 8 },
      { size: "large", price: 12 },
    ],
    toppings: ["mozzarella", "tomato", "basil"],
    category: "veg",
    available: true,
  },
  {
    name: "Pepperoni Feast",
    description: "Loaded with pepperoni slices and extra cheese.",
    image:
      "https://images.unsplash.com/photo-1662938979482-ee0d8162a545?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 6 },
      { size: "medium", price: 9 },
      { size: "large", price: 13 },
    ],
    toppings: ["mozzarella", "pepperoni"],
    category: "non-veg",
    available: true,
  },
  {
    name: "Veggie Delight",
    description: "A colorful mix of peppers, olives, mushrooms, and onions.",
    image:
      "https://images.unsplash.com/photo-1732827095444-cf446625be40?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 5 },
      { size: "medium", price: 8 },
      { size: "large", price: 11 },
    ],
    toppings: ["bell pepper", "onion", "mushroom", "olives", "mozzarella"],
    category: "veg",
    available: true,
  },
  {
    name: "BBQ Chicken",
    description: "Grilled chicken, BBQ sauce, and onions.",
    image:
      "https://images.unsplash.com/photo-1734769484424-36b99dd84818?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 6 },
      { size: "medium", price: 10 },
      { size: "large", price: 14 },
    ],
    toppings: ["chicken", "onion", "BBQ sauce", "mozzarella"],
    category: "non-veg",
    available: true,
  },
  {
    name: "Hawaiian",
    description: "A tropical mix of ham, pineapple, and cheese.",
    image:
      "https://images.unsplash.com/photo-1662022613083-2b76200e460c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 6 },
      { size: "medium", price: 9 },
      { size: "large", price: 13 },
    ],
    toppings: ["ham", "pineapple", "mozzarella"],
    category: "non-veg",
    available: true,
  },
  {
    name: "Four Cheese",
    description: "A rich blend of mozzarella, cheddar, parmesan, and gouda.",
    image:
      "https://images.unsplash.com/photo-1566843971939-1fe9e277a0c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 5 },
      { size: "medium", price: 8 },
      { size: "large", price: 12 },
    ],
    toppings: ["mozzarella", "cheddar", "parmesan", "gouda"],
    category: "veg",
    available: true,
  },
  {
    name: "Spicy Veggie",
    description: "Hot peppers, jalapenos, and spicy tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 5 },
      { size: "medium", price: 8 },
      { size: "large", price: 11 },
    ],
    toppings: ["jalapeno", "bell pepper", "onion", "mozzarella"],
    category: "veg",
    available: true,
  },
  {
    name: "Meat Lovers",
    description: "A carnivore’s dream with ham, pepperoni, and sausage.",
    image:
      "https://images.unsplash.com/photo-1669717879542-65eb286d1b23?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 7 },
      { size: "medium", price: 11 },
      { size: "large", price: 15 },
    ],
    toppings: ["pepperoni", "ham", "sausage", "mozzarella"],
    category: "non-veg",
    available: true,
  },
  {
    name: "Mediterranean",
    description: "Olives, feta cheese, onions, and sun-dried tomatoes.",
    image:
      "https://images.unsplash.com/photo-1732827095461-db5644590a63?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 6 },
      { size: "medium", price: 9 },
      { size: "large", price: 13 },
    ],
    toppings: ["feta", "olives", "onion", "sun-dried tomato", "mozzarella"],
    category: "veg",
    available: true,
  },
  {
    name: "Buffalo Chicken",
    description: "Spicy buffalo chicken with a hint of ranch.",
    image:
      "https://images.unsplash.com/photo-1751026044631-2aa676914b1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      { size: "small", price: 6 },
      { size: "medium", price: 10 },
      { size: "large", price: 14 },
    ],
    toppings: ["chicken", "buffalo sauce", "mozzarella", "onion"],
    category: "non-veg",
    available: true,
  },
];

async function seed() {
  try {
    await connectDB();
    console.log("DB connected");

    // Optional: remove existing pizzas first
    await pizzaSchema.deleteMany({});
    console.log("Old data cleared");

    // Insert new pizzas
    await pizzaSchema.insertMany(pizzas);
    console.log("Pizzas added successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

seed();
