import { Order } from "@/models/OrderSchema";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
// CREATE ORDER
export const createOrder = async (req: NextRequest) => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const body = await req.json();
  const { items, total, address, status } = body;

  if (status === "confirmed" && (!address || address.trim() === "")) {
    return NextResponse.json(
      { message: "Cannot confirm order without address." },
      { status: 400 }
    );
  }

  try {
    const newOrder = new Order({
      userId,
      items,
      total,
      address: address || null,
      isConfirmed: status === "confirmed",
      confirmedAt: status === "confirmed" ? new Date() : null,
      riderName: status === "confirmed" ? "Rider Mike" : null,
      status: status || "pending",
    });

    const savedOrder = await newOrder.save();
    return NextResponse.json(savedOrder, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create order." },
      { status: 500 }
    );
  }
};

// CONFIRM / UPDATE ORDER
export const confirmOrder = async (id: string, address: string) => {
  await connectDB();

  if (!address || address.trim() === "") {
    return NextResponse.json(
      { message: "Cannot confirm order without address." },
      { status: 400 }
    );
  }

  try {
    const order = await Order.findById(id);
    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    order.address = address;
    order.isConfirmed = true;
    order.confirmedAt = new Date();
    order.riderName = "Rider Mike";
    order.status = "on-the-way";

    const updatedOrder = await order.save();
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to confirm order." },
      { status: 500 }
    );
  }
};

// GET ORDER BY ID
export const getOrderById = async (id: string) => {
  await connectDB();

  try {
    const order = await Order.findById(id);
    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch order." },
      { status: 500 }
    );
  }
};

// GET ORDERS BY USER ID
export const getOrdersByUser = async (userId: string) => {
  await connectDB();

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // newest first

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch user orders." },
      { status: 500 }
    );
  }
};
