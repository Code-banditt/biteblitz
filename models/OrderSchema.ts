import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
    address: { type: String }, // optional at creation
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    isConfirmed: { type: Boolean, default: false },
    confirmedAt: { type: Date },
    riderName: { type: String }, // optional until checkout
    status: {
      type: String,
      enum: ["pending", "confirmed", "on-the-way", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Prevent confirming without address
OrderSchema.methods.confirmOrder = function (
  address: string,
  riderName: string
) {
  if (!address || address.trim() === "") {
    throw new Error("Cannot confirm order without address");
  }
  this.address = address;
  this.isConfirmed = true;
  this.confirmedAt = new Date();
  this.riderName = riderName;
  this.status = "preparing";
  return this.save();
};

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
