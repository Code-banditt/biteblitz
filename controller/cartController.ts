import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cartmodel";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CartItem } from "@/types/cart";

export async function CreateCart(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Get userId from NextAuth session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // ✅ Get pizza item from request body
    const { pizzaId, PizzaName, size, price, quantity, toppings, image } =
      await req.json();

    // ✅ Basic validation
    if (!pizzaId || !PizzaName || !size || !price) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    // ✅ Find or create cart for this user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // ✅ Check if same pizza + size already exists in cart
    const existingItem = cart.items.find(
      (item: CartItem) =>
        item.pizzaId.toString() === pizzaId && item.size === size
    );

    if (existingItem) {
      // Increment quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        pizzaId,
        PizzaName,
        size,
        price,
        quantity,
        toppings,
        image,
      });
    }

    // ✅ Save cart
    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

// GET CART (GET)
export async function GetCart(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function ClearCart(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectDB();
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}

export async function RemoveItem(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { itemId } = await params;

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOneAndUpdate(
      { userId, "items._id": itemId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!cart) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
