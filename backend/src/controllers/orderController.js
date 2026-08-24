import mongoose from "mongoose";
import { Orderm } from "../models/Ordermodels.js";
import { OrderItemsm } from "../models/OrderItemsmodels.js"; // Aapka naya order item model
import Productm from "../models/Productmodels.js";

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderItems, address } = req.body;
    const customer = req.user._id; // auth middleware se aana chahiye

    if (!orderItems || orderItems.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Order items required" });
    }

    // Har item ka current price DB se fetch karo
    let orderPrice = 0;
    const itemsToProcess = [];

    for (const item of orderItems) {
      const product = await Productm.findById(item.productId);
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      orderPrice += itemTotal;

      itemsToProcess.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Step 1: Pehle Main Order create karo
    const newOrder = new Orderm({
      customer,
      orderPrice,
      address,
    });

    const savedOrder = await newOrder.save({ session });

    // Step 2: OrderItems documents prepare karo aur orderId link karo
    const orderItemsDocuments = itemsToProcess.map((item) => ({
      orderId: savedOrder._id, // Foreign key link
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    // Step 3: Saare items OrderItems table mein insert kar do
    await OrderItemsm.insertMany(orderItemsDocuments, { session });

    // Sab kuch theek hai toh transaction commit kar do
    await session.commitTransaction();
    session.endSession();

    // Response mein order aur uske items wapis bhejo
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
      items: orderItemsDocuments,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.err("Error creating order:", error);
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

export {
  createOrder,
  getAllorders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
