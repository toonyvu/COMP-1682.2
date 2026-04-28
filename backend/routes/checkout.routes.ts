import { Router } from "express";
import { createNewSession } from "../controllers/checkout.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.post("/", authenticateToken, createNewSession);

export default router;
