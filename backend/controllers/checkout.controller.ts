import type { Request, Response } from "express";
import { createCheckoutSession } from "../services/checkout.service.js";

export async function createNewCheckoutSession(req: Request, res: Response) {
  const userId = Number(req.authUser.userId);
  console.log(userId);

  try {
    const result = await createCheckoutSession(userId);
    res.status(200).json({ url: result });
  } catch (err: any) {
    console.error("STRIPE ERROR:", err);
    res.status(500).json({
      message: err.message,
      type: err.type,
    });
  }
}
