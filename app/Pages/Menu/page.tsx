"use client";

import PizzaCard from "@/app/_Components/card";
import Header from "@/app/_Components/Header";
import { motion, Variants } from "framer-motion";
import { Luckiest_Guy, Baloo_2, Babylonica } from "next/font/google";
import { useState } from "react";
import { usePizzas } from "@/app/Queries/fetchPizaaQuery";
import { Pizza } from "@/types/pizza";

const luckiest = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  weight: "400",
  subsets: ["latin"],
});

const babylonica = Babylonica({
  weight: "400",
  subsets: ["latin"],
});

const dummyPizzas = [
  {
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1601924582975-5f6e0eeecabf?auto=format&fit=crop&w=900&q=80",
    sizes: [
      { size: "small", price: 8.99 },
      { size: "medium", price: 12.99 },
      { size: "large", price: 15.99 },
    ],
    toppings: ["Cheese", "Basil", "Tomato"],
    category: "veg",
    available: true,
  },
  {
    name: "Pepperoni Pizza",
    description:
      "Spicy pepperoni, mozzarella, and tomato sauce on a crispy crust.",
    image:
      "https://images.unsplash.com/photo-1681567604770-0dc826c870ae?q=80&w=900&auto=format&fit=crop",
    sizes: [
      { size: "small", price: 9.99 },
      { size: "medium", price: 13.99 },
      { size: "large", price: 16.99 },
    ],
    toppings: ["Cheese", "Pepperoni"],
    category: "non-veg",
    available: true,
  },
  {
    name: "Veggie Supreme",
    description: "Loaded with fresh vegetables and mozzarella cheese.",
    image:
      "https://images.unsplash.com/photo-1617196037853-1aef4e8cfa38?auto=format&fit=crop&w=900&q=80",
    sizes: [
      { size: "small", price: 10.99 },
      { size: "medium", price: 14.99 },
      { size: "large", price: 17.99 },
    ],
    toppings: ["Onions", "Peppers", "Olives", "Cheese"],
    category: "veg",
    available: true,
  },
  {
    name: "Chicken Feast",
    description:
      "Tender chicken, mozzarella, and tomato sauce for meat lovers.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80",
    sizes: [
      { size: "small", price: 11.99 },
      { size: "medium", price: 15.99 },
      { size: "large", price: 18.99 },
    ],
    toppings: ["Chicken", "Cheese"],
    category: "non-veg",
    available: true,
  },
];

export default function MenuPage() {
  const [category, setCategory] = useState("All");
  const { data, isLoading, isError } = usePizzas();

  // Filter pizzas by category
  const filteredPizzas =
    category === "All"
      ? data || dummyPizzas
      : (data || dummyPizzas).filter((p: Pizza) =>
          category === "Veg" ? p.category === "veg" : p.category === "non-veg"
        );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 space-y-10">
      <Header />
      {/* Menu Page header Goes Here */}
      <motion.div
        className={`h-72 bg-cover bg-center flex flex-col items-center justify-center ${luckiest.className} shad0w-xl`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <motion.h2 className="text-4xl text-yellow-400">BiteBlitz</motion.h2>
        <motion.h1 className=" text-5xl lg:text-9xl text-shadow-lg">
          Menu Page
        </motion.h1>
      </motion.div>

      <div className="min-h-screen bg-white px-6 py-10 space-y-10">
        {/* --- Header --- */}
        <div className="text-center">
          <h1
            className={`text-4xl font-bold text-gray-900 tracking-tight ${baloo.className}`}
          >
            BiteBlitz Menu
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Fresh • Hot • Fast. Pick your favourite meal.
          </p>
        </div>

        {/* --- Category Filters --- */}
        <div className="flex gap-4 justify-center sticky top-0 bg-gray-50 py-3 z-10">
          {["All", "Veg", "Non-Veg"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full border font-semibold transition
              ${
                category === cat
                  ? "bg-yellow-400 border-yellow-500 text-black"
                  : "border-gray-300 hover:bg-yellow-100 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- Pizza Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPizzas.map((pizza: Pizza, i: number) => (
            <PizzaCard key={i} pizza={pizza} />
          ))}
        </div>
      </div>
    </div>
  );
}
