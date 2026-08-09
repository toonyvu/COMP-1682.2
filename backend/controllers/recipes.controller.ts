import type { Request, Response } from "express";
import {
  getRecipeDetails,
  createRecipeService,
  getAllRecipesAdmin,
  getRecipeAdmin,
  editRecipeService,
} from "../services/recipes.service.js";

export async function getRecipes(req: Request, res: Response) {
  console.log(req);
  const userId = req.authUser.userId;
  console.log(userId);
  const { id } = req.params;
  const { mealkitId } = req.query;

  if (!id) return res.status(400).json({ message: "Invalid request." });

  try {
    console.log(id);
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid Recipe ID." });
    }

    const result = await getRecipeDetails(Number(id), userId);
    return res.status(200).json(result);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
}

export async function createRecipeController(req: Request, res: Response) {
  const { recipe, ingredients, steps } = req.body;
  console.log(recipe);
  console.log(ingredients);
  console.log(steps);

  try {
    const result = await createRecipeService(recipe, ingredients, steps);
    return res.status(200).json(result);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

export async function getRecipesAdminController(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 20;
  const page = Number(req.query.page) || 1;
  const search = String(req.query.search);

  try {
    const result = await getAllRecipesAdmin(page, limit, search);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
}

export async function getRecipeAdminController(req: Request, res: Response) {
  const { id } = await req.params;

  try {
    const result = await getRecipeAdmin(Number(id));
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
}

export async function editRecipeAdminController(req: Request, res: Response) {
  const { recipe, ingredients, steps } = req.body;

  try {
    await editRecipeService(recipe, ingredients, steps);
    return res.sendStatus(204);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
}
