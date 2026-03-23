import { JwtPayload } from "../middleware/authenticateToken.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
