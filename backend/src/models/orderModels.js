// import mongoose from 'mongoose'

// const orderSchema = new mongoose.Schema({
//     customer: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Userm",
//     },
//     orderPrice: {
//         type: String,
//         required: true,
//     },
//     orderItems: {
//         //product or us ki kitni quantity store krny k liye
//         type: [
//             {
//                 productId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Productm"
//             },
//             quantity: {
//                 type: Number,
//                 required: true
//             }
//         }
//         ]
//     },
//     address: {
//         type: String,
//         required: true
//     },

//     category:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Categorym"
//     },
//      owner:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Userm"
//     }

// }, {timestamps: true})

// export const Orderm = mongoose.model("Orderm", orderSchema)

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Userm",
//       required: true,
//     },
//     orderItems: {
//       type: [
//         {
//           productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Productm",
//             required: true,
//           },
//           quantity: {
//             type: Number,
//             required: true,
//             min: 1,
//           },
//           price: {
//             // us waqt ka product price (snapshot), future price change se order na badle
//             type: Number,
//             required: true,
//           },
//         },
//       ],
//       required: true,
//     },
//     orderPrice: {
//       type: Number,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export const Orderm = mongoose.model("Orderm", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId, // Agar registered user hai toh User model ka reference, warna guest details yahan save hongi
      ref: "User",
      required: false,
    },
    guestInfo: {
      name: String,
      email: String,
      phone: String,
    },
    address: {
      street: String,
      city: String,
      country: String,
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

export const Orderm = mongoose.model("OrderItemsm", orderSchema);
