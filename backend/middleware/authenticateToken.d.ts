import type { Request, Response, NextFunction } from "express";
export interface JwtPayload {
    userId: number;
    role: string;
    iat: number;
    exp: number;
}
export declare function authenticateToken(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authenticateToken.d.ts.map