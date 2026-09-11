import { Router } from "express";
import { getAllIngredientsController } from "../controllers/ingredients.controller.js";

const router = Router();
router.get("/", getAllIngredientsController);

export default router;
