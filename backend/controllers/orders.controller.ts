import type { Request, Response } from "express";
import { getOrder } from "../services/orders.service.js";

type Params = {
  sessionId: string;
};

export async function orderController(req: Request<Params>, res: Response) {
  const sessionId = req.params.sessionId;

  if (!sessionId) {
    return res.status(400).json({ message: "Missing sessionId" });
  }

  try {
    const order = await getOrder(sessionId);

    if (!order) {
      return res.status(404).json({ message: "Order not found yet" });
    }

    return res.status(200).json({ order });
  } catch (err: any) {
    console.error("Error fetching order:", err.message);
    return res.status(500).json({ message: "Failed to fetch order" });
  }
}
