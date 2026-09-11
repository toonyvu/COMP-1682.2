import Stripe from "stripe";
export declare function getOrder(sessionId: string): Promise<{
    order: any;
    items: any[];
    checkoutData: Stripe.Response<Stripe.Checkout.Session>;
    paymentType: Stripe.PaymentMethod.Type;
    paymentBrand: string | null;
    wallet: Stripe.PaymentMethod.Card.Wallet.Type | null;
} | null>;
export declare function cancelOrders(orderId: number): Promise<void>;
export declare function getAllOrders(userId: number): Promise<any[] | undefined>;
export declare function updateOrderStatus(orderId: number, status: string): Promise<void>;
export declare function getOrderDetails(orderId: string, userId: number): Promise<any>;
export declare function getAllOrdersAdmin(searchField: string, search: string, status: string, sort: string, order: string, page: number, limit: number): Promise<any[] | undefined>;
//# sourceMappingURL=orders.service.d.ts.map