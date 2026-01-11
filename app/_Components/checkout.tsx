"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Luckiest_Guy, Baloo_2, Fredoka } from "next/font/google";
import {
  useGetOrderById,
  useConfirmOrder,
} from "@/app/Queries/createOrderQuery";
import PizzaBounceLoader from "@/app/loader";
import OrderConfirmedModal from "./orderComfirmModal";

const luckiest = Luckiest_Guy({ subsets: ["latin"], weight: "400" });
const baloo = Baloo_2({ subsets: ["latin"], weight: "400" });
const fredoka = Fredoka({ subsets: ["latin"], weight: "400" });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

interface CheckoutPageProps {
  orderId: string;
}

export default function CheckoutPage({ orderId }: CheckoutPageProps) {
  const router = useRouter();

  const { data: order, isLoading, error } = useGetOrderById(orderId);
  const confirmOrder = useConfirmOrder(orderId);

  const [address, setAddress] = useState(() => order?.address || "");
  const [isAddressValid, setIsAddressValid] = useState(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmedData, setConfirmedData] = useState({
    address: "",
    riderName: "",
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PizzaBounceLoader />
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load order.</p>
    );
  if (!order)
    return <p className="text-center mt-10 text-gray-500">Order not found.</p>;

  const total = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    if (!address.trim()) {
      setIsAddressValid(false);
      return;
    }

    setIsAddressValid(true);

    confirmOrder.mutate(
      { address },
      {
        onSuccess: (updatedOrder) => {
          setConfirmedData({
            address: updatedOrder.address || "",
            riderName: updatedOrder.riderName || "",
          });
          setShowSuccess(true);
        },
      }
    );
  };

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-6 bg-gray-100 min-h-screen items-center justify-center p-6"
      >
        <h1
          className={`${luckiest.className} text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400`}
        >
          Checkout
        </h1>

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Order Summary */}
          <div
            className={`flex-1 border-b lg:border-b-0 lg:border-r lg:pr-6 ${fredoka.className} pb-6 lg:pb-0`}
          >
            <h2
              className={`${baloo.className} text-3xl md:text-4xl font-bold text-red-600 mb-4`}
            >
              BiteBlitz
            </h2>

            <div className="space-y-3 text-sm md:text-base text-black">
              <div className="flex justify-between">
                <span>Order ID:</span>{" "}
                <span className="font-semibold">{order._id}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>{" "}
                <span className="font-semibold">
                  {order._id || "Anonymous"}
                </span>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 text-black">
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm md:text-base">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>${item.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div
            className={`flex-1 flex flex-col justify-between ${baloo.className} pt-4 lg:pt-0 text-black`}
          >
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Delivery Address
              </h3>
              <input
                type="text"
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full p-3 rounded-xl border ${
                  isAddressValid ? "border-gray-300" : "border-red-500"
                } focus:outline-none`}
              />
              {!isAddressValid && (
                <p className="text-red-500 text-sm mt-1">
                  Address is required to proceed
                </p>
              )}
            </div>

            {/* Confirm Button */}
            {order.status === "pending" && (
              <button
                onClick={handleConfirm}
                className="bg-yellow-400 py-3 px-6 shadow-xl text-white rounded-3xl cursor-pointer mt-6 hover:bg-yellow-500 transition"
              >
                Confirm & Pay on Delivery
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <OrderConfirmedModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        address={confirmedData.address}
        riderName={confirmedData.riderName}
        orderId={order._id!}
      />
    </>
  );
}
