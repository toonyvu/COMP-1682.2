import type { Request, Response } from "express";
import { createSubscriptionSession } from "../services/subscriptions.service.js";

export async function createNewSubscriptionSession(
  req: Request,
  res: Response,
) {
  const { prodId, tier } = req.body;
  const userId = Number(req.authUser.userId);

  try {
    const result = await createSubscriptionSession(userId, prodId, tier);
    res.status(200).json({ url: result });
  } catch (err: any) {
    console.error("STRIPE ERROR:", err);
    res.status(500).json({
      message: err.message,
      type: err.type,
    });
  }
}
