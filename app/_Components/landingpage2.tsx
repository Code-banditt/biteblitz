"use client";

import { motion, Variants } from "framer-motion";
import { Luckiest_Guy, Baloo_2 } from "next/font/google";
import Image from "next/image";

const luckiest = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
const baloo = Baloo_2({ weight: "800", subsets: ["latin"] });

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const floatPizza = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const cardFloat = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, delay, type: "spring" },
  },
});

export default function CalltoAction2() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-24 py-12 overflow-visible min-h-[80vh] md:min-h-[90vh] lg:min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20,20,30,0.65), rgba(20,20,30,0.65)), url('https://images.unsplash.com/photo-1670757781705-9b6cb1ad0ca6?q=80&w=851&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle shimmer overlay */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 z-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5"
      />

      {/* LEFT SIDE */}
      <motion.div
        variants={fadeUp}
        className="flex-1 text-white relative z-10 space-y-6 flex flex-col items-start max-w-md w-full"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className={`${luckiest.className} text-5xl md:text-7xl lg:text-8xl font-bold leading-tight`}
        >
          BiteBlitz
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className={`${baloo.className} text-lg md:text-xl`}
        >
          Freshly baked, unbelievably fast — BiteBlitz brings you premium,
          handcrafted pizza delivered hot and fresh in minutes.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex gap-4 mt-4 flex-wrap w-full"
        >
          <motion.a
            href="/Pages/Menu"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black py-3 px-6 rounded-xl font-bold shadow-lg"
          >
            Order Now
          </motion.a>

          <motion.a
            href="/Pages/Menu"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white py-3 px-6 rounded-xl font-bold shadow-lg"
          >
            Explore Menu
          </motion.a>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        variants={fadeUp}
        className="flex-1 relative flex justify-center mt-10 lg:mt-0 z-10 w-full"
      >
        {/* FLOATING PIZZA */}
        <motion.div variants={floatPizza} animate="animate">
          <Image
            src="https://images.unsplash.com/photo-1670757781705-9b6cb1ad0ca6?q=80&w=851&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pizza"
            width={320}
            height={320}
            className="object-contain md:w-80 md:h-80 lg:w-96 lg:h-96"
          />
        </motion.div>

        {/* FLOATING CARDS */}
        <motion.div
          variants={cardFloat(0.3)}
          className="absolute top-0 md:top-16 right-0 md:right-4 w-52 md:w-60 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md"
        >
          <h3 className="text-yellow-300 font-bold">⚡ Fast Delivery</h3>
          <p className="text-sm text-white mt-2">
            Pizza delivered hot and fresh in record time.
          </p>
        </motion.div>

        <motion.div
          variants={cardFloat(0.6)}
          className="absolute top-24 left-0 md:top-20 md:left-24 w-52 md:w-60 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md"
        >
          <h3 className="text-yellow-300 font-bold">🥗 Fresh Ingredients</h3>
          <p className="text-sm text-white mt-2">
            Premium toppings, ripe veggies, and rich cheese.
          </p>
        </motion.div>

        <motion.div
          variants={cardFloat(0.9)}
          className="absolute top-48 right-0 md:top-64 md:right-16 w-52 md:w-60 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md"
        >
          <h3 className="text-yellow-300 font-bold">🔥 Perfectly Baked</h3>
          <p className="text-sm text-white mt-2">
            Stone-baked perfection with crispy crust and bold flavors.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
