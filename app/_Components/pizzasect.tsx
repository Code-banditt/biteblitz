"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Luckiest_Guy, Baloo_2 } from "next/font/google";
import { usePizzas } from "../Queries/fetchPizaaQuery";
import { Pizza } from "@/types/pizza";
import Link from "next/link";

const luckiest = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
const baloo = Baloo_2({ weight: "800", subsets: ["latin"] });

export default function MenuSection() {
  const { data } = usePizzas();
  const menuItems = data?.slice(0, 4) || [];

  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* 🔥 BACKGROUND IMAGE */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/pizza-hero.jpg" // 👉 put a BIG pizza image here
          alt="Pizza Background"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* 🔥 BLUR + DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h1
          className={`${luckiest.className} text-5xl sm:text-6xl lg:text-8xl text-yellow-300 text-center`}
        >
          BiteBlitz Menu
        </h1>

        <p className={`${baloo.className} text-center text-white mt-4 text-lg`}>
          Freshly baked. Delivered fast.
        </p>

        {/* MENU GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {menuItems.map((item: Pizza) => (
            <motion.div
              key={item._id}
              whileHover={{ y: -10 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 text-center"
            >
              {/* IMAGE FILLS CARD */}
              <div className="relative h-40 w-full rounded-xl overflow-hidden">
                <Image
                  src={item.image || "/images/pizza.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-xl font-bold text-[#d14949] mt-4">
                {item.name}
              </h2>

              <p className="font-semibold text-gray-700 mt-1">
                ${item.sizes[0].price.toLocaleString()}
              </p>

              <Link
                href="/Pages/Menu"
                className="mt-4 bg-[#d14949] text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600"
              >
                Add to Cart
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
