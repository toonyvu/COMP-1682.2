import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = Router();

router.get("/", authenticateToken, cartController.getCart);
router.post("/add", authenticateToken, cartController.addItem);
router.put("/remove", authenticateToken, cartController.removeItem);

export default router;
