import express from "express";
import {
  protect,
  admin,
  optionalProtect,
} from "../middlewares/authMiddleware.js";
// import upload from "../middlewares/multer.js";

import {
  createOrder,
  getAllorders,
  getOrderById,
  getOrderByIdForGuest,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(optionalProtect, createOrder)
  .get(protect, admin, getAllorders);
  router.route("/guest/:id").get(getOrderByIdForGuest);
router.route("/myorders").get(protect, getMyOrders);      
router.route("/myorder/:id").get(protect, getOrderById);
router.route("/updateorder/:id/status").put(protect, admin, updateOrderStatus);
router.route("/:id/status").put(protect, admin, deleteOrder);

export default router;


