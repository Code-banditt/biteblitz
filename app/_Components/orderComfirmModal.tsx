"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface OrderConfirmedModalProps {
  open: boolean;
  onClose: () => void;
  address: string;
  riderName: string;
  orderId: string;
}

export default function OrderConfirmedModal({
  open,
  onClose,
  address,
  riderName,
  orderId,
}: OrderConfirmedModalProps) {
  const router = useRouter();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          🎉 Order Confirmed!
        </h2>

        <p className="text-gray-700 text-center mb-4">
          Your order <span className="font-semibold">{orderId}</span> is on its
          way!
        </p>

        <div className="space-y-2 text-gray-800">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Delivery Address:</span>
            <span>{address}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Rider Name:</span>
            <span>{riderName}</span>
          </div>
        </div>

        <button
          onClick={() => {
            router.push("/Pages/Orders");
            onClose();
          }}
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 transition py-3 rounded-2xl text-white font-bold"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
