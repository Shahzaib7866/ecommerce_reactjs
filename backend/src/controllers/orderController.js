import { Orderm } from "../models/Ordermodels.js";
import { cloudinary, uploadtoCloudinary } from "../config/cloudinary.js";

const createOrder = async (req, res) => {
  console.log("REQ.FILE (Multer File):", req.file);

  try {
    const { title, description, price, stock, category } = req.body;

    const orderImage = req.file; //if using multer to handle file uploads

    let orderImageURL;

    if (orderImage) {
      // Upload image to Cloudinary
      const cloudinaryResponse = await uploadtoCloudinary(orderImage.path);
      console.log("Cloudinary upload result:", cloudinaryResponse);
      orderImageURL = cloudinaryResponse.secure_url;
    }

    const neworder = await Orderm.create({
      title,
      description,
      price,
      stock,
      category,
      orderImageURL,
    });

    res.status(201).json(neworder);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: error.message, message: "new orders not added" });
  }
};

const getAllorders = async (req, res) => {
  try {
    const orders = await Orderm.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Orderm.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, category } = req.body;

    // Sirf wahi fields updateData me daalo jo actually bheji gayi hain
    // Isse partial update sahi kaam karega (missing fields undefined ban ke DB overwrite nahi karengi)
    const updateData = {};

    if (title !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) updateData.category = category;

    // Agar new image upload hui hai to hi cloudinary pe upload karo
    // warna purani image untouched rahegi
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.imageUrl = result.secure_url;
    }

    // runValidators: true — schema validation force karta hai update ke time bhi
    // (default me findByIdAndUpdate validators skip kar deta hai)
    // new: true — updated document return karta hai, old wala nahi
    const updatedorder = await Orderm.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedorder) {
      return res.status(404).json({ message: "order not found" });
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
      return res.status(404).json({ message: "order not found" });
    }

    res.status(200).json({ message: "order deleted successfully" });
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
