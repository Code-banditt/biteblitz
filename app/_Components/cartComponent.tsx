"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useGetCart, useDeleteCartItem } from "../Queries/createCartQuery";
import { useCreateOrder } from "../Queries/createOrderQuery";
import { CartItem } from "@/types/cart";

import PizzaBounceTiny from "./tinyloader";
import { useSession } from "next-auth/react";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { data: cart, isLoading, error } = useGetCart();
  const { mutate: deleteItem } = useDeleteCartItem();
  const { mutate: clearCart, isPending } = useDeleteCartItem();
  const createOrder = useCreateOrder();
  const { data: session, status } = useSession();

  if (isPending || createOrder.isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[100]">
        <PizzaBounceTiny />
      </div>
    );
  }

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) return;

    const orderData = {
      items: cart.items.map((item: CartItem) => ({
        pizzaId: item._id, // <- REQUIRED by schema
        name: item.PizzaName,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.items.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      ),
      customer: "Anonymous", // optional, replace with user ID if needed
    };

    createOrder.mutate(orderData, {
      onSuccess: (order) => {
        // Clear cart after order creation
        cart.items.forEach((item: CartItem) =>
          clearCart({ itemId: item._id! })
        );
        onClose();
        // Navigate to checkout page with order ID
        router.push(`/Pages/Checkout/${order._id}`); // <- use _id from MongoDB
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[90]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="fixed right-0 top-0 h-full w-[360px] bg-white shadow-xl z-[100] p-5 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-yellow-300 border-b-2 mb-4">
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-2xl text-yellow-400 cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {isLoading && (
                <span className="text-center text-gray-500">
                  <PizzaBounceTiny />
                </span>
              )}

              {error && (
                <p className="text-center text-red-500">Failed to load cart</p>
              )}

              {!isLoading && cart?.items?.length === 0 && (
                <p className="text-gray-500 text-center mt-10">Cart is empty</p>
              )}

              {status === "unauthenticated" && (
                <p className="text-gray-500 text-center mt-10">
                you are not logged in,  login to see your cart
                </p>
              )}

              {cart?.items?.map((item: CartItem) => (
                <div
                  key={item._id}
                  className="flex gap-3 items-center border-b pb-3"
                >
                  <Image
                    src={item?.image || "/placeholder.png"}
                    alt={item.PizzaName}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-yellow-400">
                      {item.PizzaName}
                    </p>

                    <p className="text-xs text-gray-500">
                      Size: {item.size.toUpperCase()}
                    </p>

                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold text-red-600">
                      ${item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => deleteItem({ itemId: item._id! })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {cart?.items?.length > 0 && (
              <div className="border-t pt-4 flex flex-col gap-3">
                <h1
                  onClick={() => {
                    cart.items.forEach((item: CartItem) =>
                      clearCart({ itemId: item._id! })
                    );
                  }}
                  className="text-red-600 cursor-pointer hover:text-red-400"
                >
                  Clear cart X
                </h1>
                <span className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    $
                    {cart?.items?.reduce(
                      (total: number, item: CartItem) =>
                        total + item.price * item.quantity,
                      0
                    )}
                  </span>
                </span>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-400 text-black py-3 rounded-lg text-lg hover:bg-yellow-500 transition flex justify-center items-center gap-2 cursor-pointer"
                >
                  Checkout
                  <span>
                    $
                    {cart?.items?.reduce(
                      (total: number, item: CartItem) =>
                        total + item.price * item.quantity,
                      0
                    )}
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
