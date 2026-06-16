import type { Request, Response } from "express";
import { getUserInfo, updateUserInfo } from "../services/users.service.js";

export async function getUser(req: Request, res: Response) {
  const userId = Number(req.authUser.userId);

  try {
    const result = await getUserInfo(Number(userId));

    res.status(200).json({ user: result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  const userId = Number(req.authUser.userId);
  const {
    username,
    first_name,
    last_name,
    email,
    bio,
    address,
    phone,
    role,
    avatar_url,
    dob,
    created_at,
    tier,
  } = req.body;

  console.log(
    username,
    first_name,
    last_name,
    email,
    bio,
    address,
    phone,
    userId,
    role,
    avatar_url,
    dob,
    created_at,
    tier,
  );

  try {
    const result = await updateUserInfo({
      id: userId,
      role,
      username,
      tier,
      email,
      bio,
      avatar_url,
      dob,
      created_at,
      address,
      first_name,
      last_name,
      phone,
    });

    res.status(201).json({ result });
  } catch (err: any) {
    console.log(err);
  }
}
