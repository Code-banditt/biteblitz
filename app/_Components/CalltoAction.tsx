"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Luckiest_Guy, Baloo_2 } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import TrackOrderModal from "./TrackOrderModal";

const luckiest = Luckiest_Guy({ weight: "400", subsets: ["latin"] });
const baloo = Baloo_2({ weight: "800", subsets: ["latin"] });

export default function TrackOrderVisual() {
  const { scrollYProgress } = useScroll();

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const [trackId, setTrackId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen bg-[rgb(136,131,179)] overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1622883618971-97068745dc6c?q=80&w=1600"
            alt="Background"
            fill
            className="object-cover opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <motion.div
            style={{ scale: titleScale, opacity: titleOpacity }}
            className="space-y-6 text-black"
          >
            <h1
              className={`${luckiest.className} text-4xl sm:text-5xl lg:text-7xl`}
            >
              Track Your Order
            </h1>

            <p className={`${baloo.className} text-lg text-black/80`}>
              Follow your pizza’s journey from oven to doorstep.
            </p>

            <div className="flex gap-4 max-w-md flex-wrap">
              <input
                placeholder="Order Number"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white text-black font-semibold focus:outline-none"
              />
              <button
                onClick={() => trackId && setOpenModal(true)}
                className="bg-yellow-300 px-6 py-3 rounded-xl font-bold shadow-lg"
              >
                Track
              </button>
            </div>

            {/* Progress bar */}
            <div className="pt-4">
              <p className="text-sm mb-2 text-black/70">Order Progress</p>
              <div className="h-3 rounded-full bg-white/40 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-yellow-300"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            style={{ y: imageY }}
            className="flex justify-center relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1622883618971-97068745dc6c?q=80&w=800"
              alt="Rider"
              width={460}
              height={460}
              className="object-contain"
            />

            {/* Floating cards (desktop only) */}
            <motion.div
              className="hidden lg:block absolute top-8 right-0 w-64 p-4 bg-white/15 backdrop-blur-md rounded-xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <h3 className="text-yellow-300 font-bold">⚡ Fast Delivery</h3>
              <p className="text-sm text-black mt-2">
                Your pizza is racing through the city.
              </p>
            </motion.div>

            <motion.div
              className="hidden lg:block absolute bottom-10 left-0 w-64 p-4 bg-white/15 backdrop-blur-md rounded-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <h3 className="text-yellow-300 font-bold">🔥 Hot & Fresh</h3>
              <p className="text-sm text-black mt-2">
                Delivered straight from the oven.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= MOBILE STACKED CARDS ================= */}
      <section className="lg:hidden px-6 py-16 bg-[rgb(136,131,179)] space-y-4">
        {[
          ["⚡ Fast Delivery", "Your pizza is already on the move."],
          ["🔥 Hot & Fresh", "Perfectly baked and sealed."],
          ["🧭 Live Tracking", "Watch it move in real time."],
        ].map(([title, text], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/15 backdrop-blur-md rounded-xl p-4"
          >
            <h3 className="text-yellow-300 font-bold">{title}</h3>
            <p className="text-black mt-2">{text}</p>
          </motion.div>
        ))}
      </section>

      {openModal && (
        <TrackOrderModal
          orderId={trackId}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
