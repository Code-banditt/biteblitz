"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Luckiest_Guy } from "next/font/google";
import { useCreateCart } from "../Queries/createCartQuery";
import { Pizza, PizzaSize } from "@/types/pizza";
import { toast } from "sonner";

const luckiest = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { mutate: creatCart } = useCreateCart();

  const AddtoCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const cartItem = {
      PizzaName: pizza.name,
      pizzaId: pizza._id,
      size: selectedSize!.size,
      price: selectedSize!.price,
      quantity: quantity,
      toppings: pizza.toppings || [],
      image: pizza.image,
    };
    // Here you would typically call a mutation to add the item to the cart
    console.log("Adding to cart:", cartItem);
    creatCart(cartItem);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    AddtoCart();

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
    >
      {/* Image */}
      <div className="h-52 w-full">
        <Image
          src={pizza.image}
          width={500}
          height={500}
          alt={pizza.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name + Category */}
        <div className="flex items-center gap-3">
          <h2
            className={`text-2xl font-bold text-gray-900 ${luckiest.className}`}
          >
            {pizza.name}
          </h2>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full 
              ${
                pizza.category === "veg"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {pizza.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm">{pizza.description}</p>

        {/* Toppings */}
        {pizza!.toppings!.length > 0 && (
          <p className="text-gray-500 text-xs">
            Toppings:{" "}
            <span className="font-medium">{pizza.toppings!.join(", ")}</span>
          </p>
        )}

        {/* Sizes */}
        <div className="space-y-2">
          <p
            className={`text-sm text-gray-700 font-semibold ${luckiest.className}`}
          >
            Choose Size:
          </p>

          <div className="flex gap-3">
            {pizza.sizes.map((s) => (
              <motion.button
                key={s.size}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition border
                  ${
                    selectedSize?.size === s.size
                      ? "bg-yellow-400 border-yellow-500 text-black"
                      : "border-gray-300 hover:bg-yellow-100"
                  }
              `}
              >
                {s.size.toUpperCase()} • ${s.price}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={decreaseQty}
            className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-300"
          >
            –
          </button>

          <span className="text-lg text-amber-400 font-semibold ${luckiest.className}">
            {quantity}
          </span>

          <button
            onClick={increaseQty}
            className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <div className="pt-3 flex justify-end">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={!pizza.available}
            className={`
              px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition relative
              ${
                pizza.available
                  ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {selectedSize ? "Add to Cart" : "Select Size"}
          </motion.button>

          {/* Added Animation */}
          <AnimatePresence>
            {added && (
              <motion.span
                initial={{ scale: 0, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: -30 }}
                exit={{ scale: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute text-yellow-600 font-extrabold text-lg"
              >
                ✔ Added!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
