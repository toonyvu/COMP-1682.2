import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getAllNotificationsController } from "../controllers/notifications.controller.js";

const router = Router();

router.get("/", authenticateToken, getAllNotificationsController);

export default router;
