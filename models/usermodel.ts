import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Hashed
  provider: String, // "credentials" or "google"
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
