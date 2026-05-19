import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import * as userController from "../controllers/users.controller.js";

const router = Router();

router.get("/:id", authenticateToken, userController.getUser);
router.post("/update", authenticateToken, userController.updateUser);

export default router;
