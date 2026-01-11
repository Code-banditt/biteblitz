import { connectDB } from "@/lib/mongoose";
import pizzaSchema from "@/models/pizzaSchema";
import { NextResponse } from "next/server";

export async function PizzaFetcher() {
  await connectDB();
  const pizzas = await pizzaSchema.find({});
  return NextResponse.json(pizzas, { status: 200 });
}
