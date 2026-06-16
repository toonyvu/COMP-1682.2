import type { Request, Response } from "express";
import {
  getOrder,
  getAllOrders,
  getOrderDetails,
  getAllOrdersAdmin,
} from "../services/orders.service.js";

type Params = {
  sessionId: string;
};

export async function getOrderController(req: Request<Params>, res: Response) {
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

export async function getAllOrdersController(req: Request, res: Response) {
  const userId = Number(req.authUser.userId);
  console.log(userId);

  if (!userId) {
    return res.status(401).json({ message: "No userId found." });
  }

  try {
    const orders = await getAllOrders(userId);
    return res.status(200).json({ orders });
  } catch (err: any) {
    console.error("Error in orders:", err.message);
    return res.status(500).json({ message: err.message });
  }
}

export async function getOrderDetailsController(req: Request, res: Response) {
  const { orderId } = req.params;
  const userId = Number(req.authUser.userId);

  if (!userId || !orderId) {
    return res.status(401).json({ message: "No UserId for orderId." });
  }

  if (typeof orderId !== "string") {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const order = await getOrderDetails(orderId, userId);
    return res.status(200).json(order);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

export async function getOrdersAdminController(req: Request, res: Response) {
  try {
    const searchField = String(req.query.searchField);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = String(req.query.search ?? "");
    const sort = String(req.query.sort) || "created_at";
    const order = String(req.query.order) || "desc";
    const status = String(req.query.status) ?? "";

    console.log("get orders admin controller reached");

    const orders = await getAllOrdersAdmin(
      searchField,
      search,
      status,
      sort,
      order,
      page,
      limit,
    );
    return res.status(200).json(orders);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
