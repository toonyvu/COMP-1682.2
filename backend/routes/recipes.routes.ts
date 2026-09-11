import { Router } from "express";
import {
  getRecipes,
  createRecipeController,
  getRecipesAdminController,
  getRecipeAdminController,
  editRecipeAdminController,
} from "../controllers/recipes.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

router.get(
  "/admin",
  authenticateToken,
  requireRole("admin"),
  getRecipesAdminController,
);
router.post(
  "/",
  authenticateToken,
  requireRole("admin"),
  createRecipeController,
);

router.put(
  "/edit",
  authenticateToken,
  requireRole("admin"),
  editRecipeAdminController,
);

router.get(
  "/admin/:id",
  authenticateToken,
  requireRole("admin"),
  getRecipeAdminController,
);

router.get("/:id", authenticateToken, getRecipes);

export default router;
