
import { Orderm } from "../models/Ordermodels.js";
import { Productm } from "../models/Productmodels.js"; // price nikalne k liye

const createOrder = async (req, res) => {
  try {
    const { orderItems, address } = req.body;
    const customer = req.user._id; // auth middleware se aana chahiye, body se nahi

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    // Har item ka current price DB se fetch karo, client ka bheja hua price trust mat karo
    let orderPrice = 0;
    const itemsWithPrice = [];

    for (const item of orderItems) {
      const product = await Productm.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }
      const itemTotal = product.price * item.quantity;
      orderPrice += itemTotal;

      itemsWithPrice.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const neworder = await Orderm.create({
      customer,
      orderItems: itemsWithPrice,
      orderPrice,
      address,
    });

    res.status(201).json(neworder);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: error.message, message: "new order not added" });
  }
};

const getAllorders = async (req, res) => {
  try {
    const orders = await Orderm.find()
      .populate("customer", "name email")
      .populate("orderItems.productId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Orderm.findById(req.params.id)
      .populate("customer", "name email")
      .populate("orderItems.productId", "title price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Sirf status update karne k liye — admin panel se use hoga
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
    res.status(500).json({ message: "Error updating order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedorder = await Orderm.findByIdAndDelete(req.params.id);

    if (!deletedorder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
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