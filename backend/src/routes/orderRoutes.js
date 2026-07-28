import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import multer from "multer";
import upload from "../middlewares/multer.js";

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("image"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;



