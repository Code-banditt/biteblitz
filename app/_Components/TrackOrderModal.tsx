"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PizzaBounceTiny from "@/app/_Components/tinyloader";
import { useGetOrderById } from "@/app/Queries/createOrderQuery";

interface Props {
  orderId: string;
  onClose: () => void;
}

export default function TrackOrderModal({ orderId, onClose }: Props) {
  const { data: order, isLoading, error } = useGetOrderById(orderId);

  const statusSteps = ["pending", "confirmed", "on-the-way", "delivered"];
  const currentStep = order ? statusSteps.indexOf(order.status) : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-black">Track Order</h2>

          {isLoading && (
            <div className="flex justify-center py-8">
              <PizzaBounceTiny />
            </div>
          )}

          {error && <p className="text-red-500">Order not found.</p>}

          {order && (
            <>
              <p className="text-sm text-gray-500 mb-2">Order ID:</p>
              <p className="font-mono text-sm mb-4">{order._id}</p>

              {/* Progress bar */}
              <div className="space-y-2">
                {statusSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        index <= currentStep ? "bg-yellow-400" : "bg-gray-300"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        index <= currentStep
                          ? "font-semibold text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {step.replace("-", " ").toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Rider Info */}
              {order.riderName && (
                <div className="mt-6 border-t pt-4 text-sm text-yellow-300">
                  <p className="font-semibold">Delivery Rider</p>
                  <p>Name: {order.riderName}</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
