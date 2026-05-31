import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  getAllOrdersController,
  getOrderController,
} from "../controllers/orders.controller.js";
import { requireRole } from "../middleware/requireRole.js";
const router = Router();

router.get(
  "/session/:sessionId",
  authenticateToken,
  requireRole("user"),
  getOrderController,
);

router.get("/", authenticateToken, getAllOrdersController);

export default router;
