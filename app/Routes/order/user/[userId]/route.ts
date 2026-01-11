import { NextRequest } from "next/server";
import { getOrdersByUser } from "@/controller/orderController";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const params = await context.params;
  const userId = params.userId;

  if (!userId) {
    return Response.json({ message: "Invalid userId" }, { status: 400 });
  }

  return getOrdersByUser(userId);
}
