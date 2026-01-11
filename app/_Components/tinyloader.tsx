"use client";

import { motion } from "framer-motion";
import { Pizza } from "lucide-react";
import Image from "next/image";

export default function PizzaBounceTiny() {
  return (
    <div className="flex items-center justify-center w-6 h-6">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Pizza className="h-6 w-6"/>
      </motion.div>
    </div>
  );
}
