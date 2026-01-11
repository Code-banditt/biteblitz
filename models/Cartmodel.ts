import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        pizzaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: true,
        },

        PizzaName: {
          type: String,
          required: true,
        },

        // Because small/medium/large have different prices
        size: {
          type: String,
          enum: ["small", "medium", "large"],
          required: true,
        },

        // Price locked at the time it was added to cart
        price: {
          type: Number,
          required: true,
        },

        // Quantity of this size
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },

        image: { type: String },

        // Optional: store chosen toppings if you allow customization
        toppings: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
