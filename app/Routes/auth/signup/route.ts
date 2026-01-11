import { RegisterUser } from "@/controller/userController";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const response = await RegisterUser(name, email, password);
  return response;
}
