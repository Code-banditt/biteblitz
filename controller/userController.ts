import { connectDB } from "@/lib/mongoose";
import usermodel from "@/models/usermodel";
import { hashPassword } from "@/app/Libs/hashpassword";
import { NextResponse } from "next/server";

export async function RegisterUser(
  name: string,
  email: string,
  password: string
) {
  await connectDB();
  const existingUser = await usermodel.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashPasswordValue = await hashPassword(password);

  const newUser = new usermodel({
    name,
    email,
    password: hashPasswordValue,
    provider: "credentials",
  });

  await newUser.save();
  return NextResponse.json(newUser, { status: 201 });
}

export async function GetUserByEmail(email: string) {
  await connectDB();
  const user = await usermodel.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}

export async function GetUserById(id: string) {
  await connectDB();
  const user = await usermodel.findById(id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}

export async function UpdateUserPassword(
  email: string,
  newHashedPassword: string
) {
  await connectDB();
  const user = await usermodel.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  user.password = newHashedPassword;
  await user.save();
  return NextResponse.json(
    { message: "Password updated successfully" },
    { status: 200 }
  );
}

export async function AuthenticateUser(email: string, hashedPassword: string) {
  await connectDB();
  const user = await usermodel.findOne({ email, password: hashedPassword });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  return NextResponse.json(user, { status: 200 });
}
