import { getAllRecipes } from "../services/mealkits.service.js";

import type { Request, Response } from "express";

export async function getMealKits(req: Request, res: Response): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const week = Number(req.query.week);

    const result = await getAllRecipes(page, limit, week);
    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(500).json({ message: "Can't get recipes." });
  }
}
