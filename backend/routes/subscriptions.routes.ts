import { Router } from "express";
import { createNewSubscriptionSession } from "../controllers/subscriptions.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.post("/", authenticateToken, createNewSubscriptionSession);

export default router;
