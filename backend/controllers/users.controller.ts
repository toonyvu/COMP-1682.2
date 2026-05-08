import type { Request, Response } from "express";
import { getUserInfo } from "../services/users.service.js";

export async function getUserInformation(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await getUserInfo(Number(id));

    res.status(200).json({ user: result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
