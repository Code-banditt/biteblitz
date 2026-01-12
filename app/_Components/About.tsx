"use client";

import { Luckiest_Guy, Baloo_2, Fredoka } from "next/font/google";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const luckiest = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
const baloo = Baloo_2({ weight: "800", subsets: ["latin"] });
const fredoka = Fredoka({ weight: "700", subsets: ["latin"] });

// Float animation for boxes
const floatBox = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

// Fade in from left for text
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export default function AboutPage() {
  const boxes = [
    {
      number: 1,
      text: "Experience lightning-fast pizza delivery that brings piping-hot, freshly baked pizza straight from our oven to your door in the blink of an eye.",
      label: "Fast Delivery",
      classPosition: "absolute top-5 -right-3",
      width: "w-64",
    },
    {
      number: 2,
      text: "Every pizza we make is crafted with the freshest, hand-selected ingredients, ensuring every bite bursts with authentic flavor.",
      label: "Rare Ingredients",
      classPosition: "absolute top-42 left-1",
      width: "w-64",
    },
    {
      number: 3,
      text: "Our pizzas are baked to perfection with care and precision, delivering a perfect balance of crispy crust, savory toppings, and rich, melty cheese.",
      label: "Perfectly Baked",
      classPosition: "absolute top-80 -right-3",
      width: "w-64",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mt-16 font-sans px-4 sm:px-6 md:px-12 lg:px-24 gap-8">
      {/* LEFT SIDE — About Text */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="flex-1 flex flex-col gap-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className={`${luckiest.className} text-5xl lg:text-9xl font-bold text-yellow-300`}
        >
          ABOUT US
        </motion.h1>

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className={`w-full ${fredoka.className}`}>
            <h2
              className={`${baloo.className} text-3xl md:text-4xl font-bold text-[#d14949] mb-4`}
            >
              About Us
            </h2>
            <p className="text-black text-sm md:text-base leading-relaxed mb-4">
              At <span className="font-bold text-[#d14949]">BiteBlitz</span>,
              we’re all about bold flavors, fresh ingredients, and unforgettable
              pizza moments. Every slice is crafted with precision — from our
              hand-stretched dough to our signature sauces and premium toppings.
            </p>
            <p className="text-black text-sm md:text-base leading-relaxed mb-4">
              Whether you are craving a cheesy classic or a daring new flavor,
              our team makes every pizza with passion, quality, and a touch of
              creativity. Our lightning-fast delivery ensures your pizza reaches
              you hot, fresh, and ready to enjoy.
            </p>
            <p className="text-black text-sm md:text-base leading-relaxed">
              BiteBlitz isn’t just food — it’s an experience built around speed,
              freshness, and the joy of every bite.
            </p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE — Image + Floating Boxes */}
      <div className="flex-1 relative flex justify-center items-start w-full mt-6 lg:mt-0">
        <Image
          src="/images/serving.png"
          alt="Pizza Rider"
          width={400}
          height={600}
          className="object-contain md:w-72 md:h-96 lg:w-[450px] lg:h-[600px]"
        />

        {boxes.map((box, i) => (
          <motion.div
            key={i}
            variants={floatBox}
            animate="animate"
            className={`${box.classPosition} ${box.width} p-3 bg-white/10 rounded-2xl border border-white/20 shadow-md`}
          >
            <div className="absolute -top-3 -left-3 w-6 h-6 md:w-8 md:h-8 bg-black rounded-full flex items-center justify-center text-yellow-300 font-bold text-xs md:text-base">
              {box.number}
            </div>
            <p
              className={`mt-6 text-white text-xs md:text-sm ${baloo.className}`}
            >
              {box.text}
            </p>
            <div className="bg-yellow-300 text-black rounded-full w-24 md:w-28 text-center py-1 mt-2 text-xs md:text-sm font-semibold">
              {box.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
