import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getUserInformation } from "../controllers/users.controller.js";

const router = Router();

router.get("/:id", authenticateToken, getUserInformation);

export default router;
