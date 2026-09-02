import mongoose from "mongoose";
import { Orderm } from "../models/orderModels.js";
import { OrderItemsm } from "../models/orderItemsModel.js";
import Productm from "../models/Productmodels.js";

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // CHANGE: schema field names ke hisaab se destructure — address/email/phone nahi,
    // shippingAddress/guestInfo hain
    const { orderItems, shippingAddress, guestInfo, paymentMethod } = req.body;

    // CHANGE: optionalProtect ne req.user set kiya ho to registered, warna guest
    const isRegisteredUser = !!req.user;
    const customer = isRegisteredUser ? req.user._id : null;

    if (!orderItems || orderItems.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Order items required" });
    }

    // CHANGE: guestInfo.email check (guestEmail nahi — schema mein guestInfo.email hai)
    if (!isRegisteredUser && !guestInfo?.email) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Email required for guest checkout" });
    }

    // NAYA: basic sanity checks (security)
    if (!shippingAddress || !paymentMethod) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Shipping address and payment method required" });
    }

    // CHANGE: orderPrice → totalAmount (schema field name)
    let totalAmount = 0;
    const itemsToProcess = [];

    for (const item of orderItems) {
      // NAYA: quantity sanity check — abuse rokne ke liye
      if (!item.quantity || item.quantity < 1 || item.quantity > 20) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const product = await Productm.findById(item.productId);
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      itemsToProcess.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        size: item.size,
      });
    }

    // CHANGE: schema ke exact field names — customer, guestInfo, shippingAddress, totalAmount
    const newOrder = new Orderm({
      customer,
      guestInfo: isRegisteredUser ? undefined : guestInfo, // registered ho to guestInfo save nahi karte
      shippingAddress,
      totalAmount,
      paymentMethod,
    });

    const savedOrder = await newOrder.save({ session });

    const orderItemsDocuments = itemsToProcess.map((item) => ({
      orderId: savedOrder._id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
    }));

    await OrderItemsm.insertMany(orderItemsDocuments, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
      items: orderItemsDocuments,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: error.message, message: "New order not added" });
  }
};

const getAllorders = async (req, res) => {
  try {
    // 1. Sary orders nikalen
    const orders = await Orderm.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    // 2. Har order ke mukable uske items fetch karne ke liye map chalayen
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItemsm.find({ orderId: order._id }).populate(
          "productId",
          "title price image"
        ); // Product ki details populate ki hain

        return {
          ...order.toObject(),
          orderItems: items, // Frontend ke liye array ki form mein attach kar diya
        };
      })
    );

    res.status(200).json(ordersWithItems);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Orderm.findById(req.params.id).populate(
      "customer",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Is order ke against jitne items hain unhein alag se fetch karein
    const items = await OrderItemsm.find({ orderId: order._id }).populate(
      "productId",
      "title price image"
    );

    res.status(200).json({
      ...order.toObject(),
      orderItems: items,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedorder = await Orderm.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedorder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedorder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(200).json({ message: "Error updating order" });
  }
};

const deleteOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderId = req.params.id;

    const deletedorder = await Orderm.findByIdAndDelete(orderId, { session });

    if (!deletedorder) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Order not found" });
    }

    // Jab order delete ho toh uske associated orderItems ko bhi delete karna zaroori hai
    await OrderItemsm.deleteMany({ orderId: orderId }, { session });

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Order and its items deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({ message: "Error deleting order: Internal server error" });
  }
};

const getOrderByIdForGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;

    const order = await Orderm.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // NAYA: agar ye registered user ka order hai, guest route se access allowed nahi
    if (order.customer) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // CHANGE: guestEmail → guestInfo.email
    if (order.guestInfo?.email !== email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const items = await OrderItemsm.find({ orderId: order._id }).populate(
      "productId",
      "title price image"
    );

    res.status(200).json({ ...order.toObject(), orderItems: items });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// registered user apne saare orders dekhega
const getMyOrders = async (req, res) => {
  try {
    const orders = await Orderm.find({ customer: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createOrder,
  getAllorders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderByIdForGuest,
  getMyOrders,
};
