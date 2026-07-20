import type { Request, Response } from "express";
import {
  getOrder,
  getAllOrders,
  getOrderDetails,
  getAllOrdersAdmin,
  updateOrderStatus,
  cancelOrders,
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

export async function cancelOrderController(req: Request, res: Response) {
  const { orderId, status } = req.body;
  console.log(orderId, status);

  if (!orderId || !status) {
    return res.status(400).json({ message: "No orderId or Status." });
  }

  try {
    await cancelOrders(Number(orderId), status);
    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message || "Failed to cancel order.",
    });
  }
}

export async function getOrderDetailsAdminController(
  req: Request,
  res: Response,
) {
  const { orderId } = req.params;
  const { userId } = req.query;

  const parsedUserId = Number(userId);
  console.log(userId);

  if (!userId) {
    return res.status(401).json({ message: "No userId!" });
  }

  if (!userId || !orderId) {
    return res.status(401).json({ message: "No UserId or orderId." });
  }

  if (typeof orderId !== "string") {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const order = await getOrderDetails(orderId, parsedUserId);
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

export async function updateOrderStatusController(req: Request, res: Response) {
  const { orderId, status } = req.body;

  console.log(orderId, status);

  const parsedOrderId = Number(orderId);
  const parsedStatus = String(status);

  if (isNaN(parsedOrderId) || !parsedStatus) {
    return res
      .status(400)
      .json({ message: "Bad Request, OrderId or Status not found." });
  }

  try {
    await updateOrderStatus(parsedOrderId, parsedStatus);

    return res.sendStatus(204);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
