import type { JwtPayload } from "../middleware/authenticateToken";

declare global {
  namespace Express {
    interface Request {
      authUser?: JwtPayload;
    }
  }
}

export {};
