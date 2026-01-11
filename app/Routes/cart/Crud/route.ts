import { NextRequest } from "next/server";
import { CreateCart } from "@/controller/cartController";
import { GetCart } from "@/controller/cartController";

export async function GET(req: NextRequest) {
  return await GetCart(req);
}
export async function POST(req: NextRequest) {
  return await CreateCart(req);
}
