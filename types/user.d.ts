export interface IUser {
  _id?: string; // MongoDB ID
  name: string;
  email: string;
  password?: string; // hashed
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
