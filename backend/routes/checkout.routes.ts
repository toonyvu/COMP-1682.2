import { Router } from "express";
import { createNewCheckoutSession } from "../controllers/checkout.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.post("/", authenticateToken, createNewCheckoutSession);

export default router;
