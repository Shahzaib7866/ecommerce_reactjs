import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    guestInfo: {
      name: String,
      email: {
        type: String,
        // NAYA: agar customer nahi hai (guest order) to email mandatory
        required: function () {
          return !this.customer;
        },
      },
      phone: String,
    },
    shippingAddress: {
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      state: String,
      postalCode: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Orderm = mongoose.model("Orderm", orderSchema);
