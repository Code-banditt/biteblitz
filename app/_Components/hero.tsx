"use client";

import { motion, Variants } from "framer-motion";
import { Luckiest_Guy, Baloo_2, Fredoka } from "next/font/google";
import Image from "next/image";

const luckiest = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
const baloo = Baloo_2({ weight: "800", subsets: ["latin"] });
const fredoka = Fredoka({ weight: "700", subsets: ["latin"] });

// Floating box animation
const floatBox = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

// Optional: fade up for left side
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans px-4 sm:px-6 md:px-12 lg:px-24 py-8 lg:py-12 gap-8">
      {/* LEFT SIDE — Order Summary */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-6"
      >
        <h1
          className={`${luckiest.className} text-4xl sm:text-5xl lg:text-7xl font-bold text-yellow-300`}
        >
          Services
        </h1>

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Order Summary */}
          <div
            className={`flex-1 border-b lg:border-b-0 lg:border-r lg:pr-6 ${fredoka.className} pb-6 lg:pb-0`}
          >
            <h2
              className={`${baloo.className} text-3xl md:text-4xl font-bold text-[#d14949] mb-4`}
            >
              BiteBlitz
            </h2>

            <div className="space-y-3 text-sm md:text-base text-black">
              <div className="flex justify-between">
                <span>Order ID:</span> <span>#A92D12</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span> <span>Anthony</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span> <span>12 Palm Street</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span> <span>Paid • ₦7,800</span>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 text-black">
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <span>1x Large Pepperoni Pizza</span>
                  <span>₦5,500</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Garlic Bread</span>
                  <span>₦1,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₦1,100</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>₦7,800</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Tracking */}
          <div
            className={`flex-1 flex flex-col justify-between ${baloo.className} pt-4 lg:pt-0 text-black`}
          >
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">
                Delivery Tracking
              </h3>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 md:h-4 md:w-4 bg-green-500 rounded-full"></div>
                  Order Confirmed
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 md:h-4 md:w-4 bg-green-500 rounded-full"></div>
                  Pizza Being Prepared
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 md:h-4 md:w-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  Rider On The Way
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 md:h-4 md:w-4 bg-gray-300 rounded-full"></div>
                  Delivered
                </div>
              </div>
            </div>
            <div className="text-right mt-4 lg:mt-0">
              <span className="text-xs md:text-sm text-gray-500">
                Estimated Delivery: <br />
                <span className="font-bold text-black">30 - 50 Minutes</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE — Image + Floating Boxes */}
      <div className="flex-1 relative flex justify-center items-start w-full mt-6 lg:mt-0">
        <Image
          src="/images/fullbody.png"
          alt="Pizza Rider"
          width={350}
          height={450}
          className="object-contain md:w-72 md:h-96 lg:w-[450px] lg:h-[600px]"
        />

        {/* Floating Boxes */}
        <div className="absolute top-8 md:top-12 lg:top-20 right-0 md:right-16 flex flex-col gap-4">
          {[
            {
              number: 1,
              title: "Fast Delivery",
              text: "Fast, hot pizza delivered in record time.",
              width: "w-52 md:w-64",
            },
            {
              number: 2,
              title: "Rare Ingredients",
              text: "Only the freshest ingredients for authentic taste.",
              width: "w-52 md:w-64",
            },
            {
              number: 3,
              title: "Perfectly Baked",
              text: "Perfectly baked pizzas with crispy crusts and rich cheese.",
              width: "w-52 md:w-64",
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              variants={floatBox}
              animate="animate"
              className={`relative ${box.width} p-3 bg-white/10 rounded-2xl border border-white/20 shadow-md`}
            >
              <div className="absolute -top-3 -left-3 w-6 h-6 md:w-8 md:h-8 bg-black rounded-full flex items-center justify-center text-yellow-300 font-bold text-xs md:text-base">
                {box.number}
              </div>
              <p
                className={`text-white text-xs md:text-sm mt-6 ${baloo.className}`}
              >
                {box.text}
              </p>
              <div className="bg-yellow-300 text-black rounded-full w-24 md:w-28 text-center py-1 mt-2 text-xs md:text-sm font-semibold">
                {box.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
