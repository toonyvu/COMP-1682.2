import type { Request, Response } from "express";
export declare function login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function signup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function logout(req: Request, res: Response): Promise<void>;
export declare function Callback(req: Request, res: Response): Promise<void>;
export declare function refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function forgotPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map