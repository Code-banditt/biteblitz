import { PizzaFetcher } from "@/controller/pizzaController";

export async function GET() {
  return await PizzaFetcher();
}
