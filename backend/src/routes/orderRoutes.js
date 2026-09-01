import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
// import upload from "../middlewares/multer.js";

import {
  createOrder,
  getAllorders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllorders);

router.route("/myorders/:id").get(protect, getOrderById);

router.route("/updateorder/:id/status").put(protect, admin, updateOrderStatus);

router.route("/:id/status").put(protect, admin, deleteOrder);

export default router;
