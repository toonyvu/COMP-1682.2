import type { Request, Response } from "express";
import * as cartService from "../services/cart.service.js";

export async function addItem(req: Request, res: Response) {
  const { userId, mealkitId, week } = req.body;

  try {
    await cartService.addItem(userId, mealkitId, week);
    const result = await cartService.getFullCart(userId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Failed to add item to cart." });
  }
}

export async function removeItem(req: Request, res: Response) {
  const { userId, mealkitId } = req.body;

  try {
    await cartService.removeItem(userId, mealkitId);
    const result = await cartService.getFullCart(userId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item from cart." });
  }
}
