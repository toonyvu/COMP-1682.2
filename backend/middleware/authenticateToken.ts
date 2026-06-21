import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export interface JwtPayload {
  userId: number;
  role: string;
  iat: number;
  exp: number;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;

    (req as any).authUser = decoded;

    console.log("Complete");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
