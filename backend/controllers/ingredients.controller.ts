import type { Request, Response } from "express";
import { getAllIngredientsService } from "../services/ingredients.service.js";

export async function getAllIngredientsController(req: Request, res: Response) {
  const { page, limit } = req.query;
  try {
    const result = await getAllIngredientsService(Number(page), Number(limit));
    console.log("Controller reached");
    if (result) {
      return res.status(200).json(result);
    } else {
      throw new Error("Unable to find ingredients.");
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}
