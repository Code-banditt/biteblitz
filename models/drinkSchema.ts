import mongoose from "mongoose";

const DrinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: String, enum: ["small", "medium", "large"], required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Drink || mongoose.model("Drink", DrinkSchema);
