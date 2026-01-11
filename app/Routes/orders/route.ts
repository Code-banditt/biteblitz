import { NextRequest } from "next/server";
import { createOrder } from "@/controller/orderController";

// POST /Routes/orders
export async function POST(req: NextRequest) {
  return createOrder(req);
}
