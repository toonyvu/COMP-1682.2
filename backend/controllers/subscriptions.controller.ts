import type { Request, Response } from "express";
import { createSubscriptionSession } from "../services/subscriptions.service.js";

export async function createNewSubscriptionSession(
  req: Request,
  res: Response,
) {
  const { prodId } = req.body;
  const userId = Number(req.user?.userId);

  try {
    const result = await createSubscriptionSession(userId, prodId);
    res.status(200).json({ url: result });
  } catch (err: any) {
    console.error("STRIPE ERROR:", err);
    res.status(500).json({
      message: err.message,
      type: err.type,
    });
  }
}
