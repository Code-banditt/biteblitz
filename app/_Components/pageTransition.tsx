"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PizzaBounceTiny from "./tinyloader";

export default function PageTransition() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setIsLoading(true);
    }, 0);

    const unloadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => {
      clearTimeout(loadTimeout);
      clearTimeout(unloadTimeout);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <PizzaBounceTiny />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
