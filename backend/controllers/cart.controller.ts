import type { Request, Response } from "express";
import * as cartService from "../services/cart.service.js";

export async function addItem(req: Request, res: Response) {
  const { mealkitId } = req.body;
  const userId = Number(req.user?.userId);
  try {
    await cartService.addItem(userId, mealkitId);
    const result = await cartService.getFullCart(userId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json(err || { message: "Failed to add item to cart." });
  }
}

export async function removeItem(req: Request, res: Response) {
  const { mealkitId } = req.body;
  const userId = Number(req.user?.userId);
  try {
    await cartService.removeItem(userId, mealkitId);
    const result = await cartService.getFullCart(userId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item from cart." });
  }
}

export async function alterQty(req: Request, res: Response) {
  const { mealkitId, qty } = req.body;
  const userId = Number(req.user?.userId);

  try {
    await cartService.updateQty(Number(userId), Number(mealkitId), Number(qty));
    const result = await cartService.getFullCart(Number(userId));

    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Failed to update quantity." });
  }
}

export async function getCart(req: Request, res: Response) {
  const userId = Number(req.user?.userId);

  try {
    const result = await cartService.getFullCart(userId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Failed to get cart information." });
  }
}

export async function clearCart(req: Request, res: Response) {
  const userId = Number(req.user?.userId);

  try {
    await cartService.clearCart(userId);
    const result = await cartService.getFullCart(userId);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Failed to get cart information." });
  }
}
