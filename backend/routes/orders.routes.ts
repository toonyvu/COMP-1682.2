import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { orderController } from "../controllers/orders.controller.js";
const router = Router();

router.get("/session/:sessionId", authenticateToken, orderController);

export default router;
