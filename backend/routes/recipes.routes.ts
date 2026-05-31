import { Router } from "express";
import {
  getRecipes,
  addFavorite,
  deleteFavorite,
  createRecipeController,
} from "../controllers/recipes.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.get("/:id", authenticateToken, getRecipes);
router.post("/:id", authenticateToken, addFavorite);
router.post("/", authenticateToken, createRecipeController);
router.delete("/:id", authenticateToken, deleteFavorite);

export default router;
