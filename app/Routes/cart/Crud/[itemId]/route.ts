import { ClearCart, RemoveItem } from "@/controller/cartController";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  return RemoveItem(req, { params });
}

export async function DELETEALL(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  return ClearCart(req, { params });
}
