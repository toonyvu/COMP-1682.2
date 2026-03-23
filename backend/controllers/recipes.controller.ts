import type { Request, Response } from "express";
import { getRecipeDetails } from "../services/recipes.service.js";
import {
  addRecipeFavorite,
  removeRecipeFavorite,
} from "../services/recipeFavorites.service.js";

export async function getRecipes(req: Request, res: Response) {
  console.log(req);
  const userId = req.user!.userId;
  const { id } = req.params;


  if (!id) return res.status(400).json({ message: "Invalid request." });

  try {
    console.log(id);
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid Recipe ID." });
    }

    console.log("Function continues");
    const result = await getRecipeDetails(Number(id), userId);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: "Server Error." });
  }
}

export async function addFavorite(req: Request, res: Response) {
  const userId = req.user!.userId;
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid request." });

  try {
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid Recipe ID." });
    }

    await addRecipeFavorite(Number(id), userId);
    return res.status(200).json({ message: "Recipe added to favorites." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to add recipe to favorites." });
  }
}

export async function deleteFavorite(req: Request, res: Response) {
  const userId = req.user!.userId;
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid request." });

  try {
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid Recipe ID." });
    }

    const deleted = await removeRecipeFavorite(Number(id), userId);
    if (deleted === 0) {
      return res.status(404).json({ message: "No favorite recipe founds." });
    }
    return res.status(200).json({ message: "Recipe added to favorites." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to add recipe to favorites." });
  }
}
