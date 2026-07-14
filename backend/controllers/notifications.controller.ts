import type { Request, Response } from "express";
import { getAllNotificationsService } from "../services/notifications.service.js";

export async function getAllNotificationsController(
  req: Request,
  res: Response,
) {
  const userId = Number(req.authUser.userId);
  console.log(userId);

  try {
    const notifications = await getAllNotificationsService(userId);
    return res.status(200).json({ notifications: notifications });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
}
