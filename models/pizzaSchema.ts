import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // URL to image
    sizes: [
      {
        size: {
          type: String,
          enum: ["small", "medium", "large"],
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],
    toppings: [{ type: String }], // e.g., ["cheese", "pepperoni"]
    category: { type: String, enum: ["veg", "non-veg"], default: "veg" },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Pizza || mongoose.model("Pizza", PizzaSchema);
