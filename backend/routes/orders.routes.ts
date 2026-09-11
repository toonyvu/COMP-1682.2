import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  getAllOrdersController,
  getOrderController,
  getOrderDetailsAdminController,
  getOrderDetailsController,
  getOrdersAdminController,
  updateOrderStatusController,
  cancelOrderController,
} from "../controllers/orders.controller.js";
import { requireRole } from "../middleware/requireRole.js";
const router = Router();

router.get(
  "/session/:sessionId",
  authenticateToken,
  requireRole("user"),
  getOrderController,
);

router.get(
  "/admin",
  authenticateToken,
  requireRole("admin"),
  getOrdersAdminController,
);

router.patch(
  "/admin/updateStatus",
  authenticateToken,
  requireRole("admin"),
  updateOrderStatusController,
);

router.patch("/cancelOrder", authenticateToken, cancelOrderController);

router.get("/", authenticateToken, getAllOrdersController);

router.get(
  "/admin/:orderId",
  authenticateToken,
  requireRole("admin"),
  getOrderDetailsAdminController,
);

router.get("/:orderId", authenticateToken, getOrderDetailsController);

export default router;
