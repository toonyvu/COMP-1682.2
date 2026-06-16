import { Router } from "express";
import {
  getRecipes,
  addFavorite,
  deleteFavorite,
  createRecipeController,
  getRecipesAdminController,
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

router.get("/:id", authenticateToken, getRecipes);
router.post("/:id", authenticateToken, addFavorite);
router.delete("/:id", authenticateToken, deleteFavorite);

export default router;
