"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetOrdersByUser } from "@/app/Queries/createOrderQuery";
import PizzaBounceTiny from "@/app/_Components/tinyloader";
import { ChevronRight } from "lucide-react";
import { Copy, Check } from "lucide-react";
import { CopyButton } from "@/app/_Components/Copy";
import Header from "@/app/_Components/Header";

export default function OrderHistoryPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user?.id as string;
  const { data: orders, isLoading } = useGetOrdersByUser(userId);

  // Not logged in
  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        Please log in to view your orders
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <PizzaBounceTiny />
      </div>
    );
  }

  // No orders
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-500">
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm text-yellow-300">
          When you place an order, it will appear here 🍕
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      <div className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 bg-yellow-300 py-4 px-4">
            Order History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and review your past orders
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() => router.push(`/Pages/Checkout/${order._id}`)}
            className="group border rounded-xl px-6 py-5 bg-white hover:border-yellow-400 hover:shadow-sm transition cursor-pointer"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Order</p>

                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{order._id}</p>

                  {order._id && <CopyButton text={order._id} />}
                </div>
              </div>

              <StatusBadge status={order.status} />

              <ChevronRight className="text-gray-400 group-hover:text-yellow-400 transition" />
            </div>

            {/* Order Meta */}
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
              <span>
                Date:{" "}
                {new Date(order.createdAt || new Date()).toLocaleDateString()}
              </span>

              <span>{order.items.length} items</span>

              <span className="font-semibold text-gray-900">
                Total: ${order.total}
              </span>
            </div>

            {/* Rider Info (only if assigned) */}
            {order.riderName && order.status !== "pending" && (
              <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                <p className="font-medium text-gray-900">Delivery Rider</p>
                <p>{order.riderName}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-gray-100 text-gray-700",
    confirmed: "bg-yellow-100 text-yellow-700",
    "on-the-way": "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || styles.pending
      }`}
    >
      {status.replace("-", " ").toUpperCase()}
    </span>
  );
}
