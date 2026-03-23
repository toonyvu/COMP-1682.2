import { Router } from "express";
import { getMealKits } from "../controllers/mealkits.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = Router();

router.get("/", authenticateToken, getMealKits);

export default router;
