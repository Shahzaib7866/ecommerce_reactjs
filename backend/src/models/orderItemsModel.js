
import mongoose from "mongoose";
 
const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true, // Fast searching ke liye index zaroori hai
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Aapke Product model ka reference
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number, // Jis price par product us waqt bika (historical price safe rakhne ke liye)
      required: true,
    },
  },
  { timestamps: true }
);

export const OrderItemsm = mongoose.model("Orderm", orderItemSchema);
