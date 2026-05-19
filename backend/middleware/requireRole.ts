import type { Request, Response, NextFunction } from "express";

//Spread operator lets you combine all variables into a single array without explicitly typing it.
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden.",
      });
    }

    next();
  };
}
