import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const saltRounds = 10; // secure and fast enough
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}
