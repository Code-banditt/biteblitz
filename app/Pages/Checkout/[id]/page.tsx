"use client";

import CheckoutPage from "@/app/_Components/checkout";
import { useParams } from "next/navigation";

export default function CheckoutWrapper() {
  const params = useParams();
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!orderId) return <p>Order ID not found</p>;

  return <CheckoutPage orderId={orderId} />;
}
