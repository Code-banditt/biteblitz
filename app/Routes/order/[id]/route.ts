import { NextRequest, NextResponse } from "next/server";
import { getOrderById, confirmOrder } from "@/controller/orderController";

// Correct GET handler type
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- keep as Promise
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { message: "Order ID is required" },
      { status: 400 }
    );
  }

  return getOrderById(id);
}

// Correct PATCH handler type
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: orderId } = await context.params;

  if (!orderId) {
    return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
  }

  const body = await req.json();
  const { address } = body as { address?: string };

  if (!address) {
    return NextResponse.json(
      { message: "Address is required" },
      { status: 400 }
    );
  }

  return confirmOrder(orderId, address);
}
