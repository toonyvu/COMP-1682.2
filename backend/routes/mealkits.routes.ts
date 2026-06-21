import { Router } from "express";
import {
  getMealKits,
  createMealkitController,
} from "../controllers/mealkits.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { requireRole } from "../middleware/requireRole.js";
const router = Router();

router.get("/", authenticateToken, getMealKits);
router.post(
  "/",
  authenticateToken,
  requireRole("admin"),
  createMealkitController,
);

export default router;
