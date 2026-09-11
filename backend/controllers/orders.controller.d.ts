import type { Request, Response } from "express";
type Params = {
    sessionId: string;
};
export declare function getOrderController(req: Request<Params>, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getAllOrdersController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getOrderDetailsController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function cancelOrderController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getOrderDetailsAdminController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getOrdersAdminController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateOrderStatusController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=orders.controller.d.ts.map