"use client";

import { motion } from "framer-motion";
import { Pizza } from "lucide-react";
import Image from "next/image";

export default function PizzaBounceLoader() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Pizza />
      </motion.div>
    </div>
  );
}
