"use client";

import { motion } from "framer-motion";
import { PiPizza } from "react-icons/pi";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16"
    >
      <h1 className="text-5xl font-extrabold text-yellow-500 flex items-center gap-2">
        About BiteBlitz <PiPizza />
      </h1>

      <p className="mt-6 text-center text-gray-700 max-w-2xl text-lg">
        Welcome to BiteBlitz! We’re passionate about delivering delicious pizzas
        straight to your door. Our mission is simple: fresh ingredients, fast
        delivery, and happy customers. Whether you’re a fan of classic
        Margherita or bold specialty pizzas, BiteBlitz has something for
        everyone.
      </p>

      <p className="mt-4 text-center text-gray-500 max-w-2xl">
        This is a placeholder page for now, but soon we’ll tell you more about
        our story, team, and love for pizza!
      </p>
    </motion.div>
  );
}
