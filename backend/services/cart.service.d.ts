export declare function getOrCreateCart(userId: number): Promise<any>;
export declare function addItem(userId: number, mealkitId: number): Promise<void>;
export declare function removeItem(userId: number, mealkitId: number): Promise<void>;
export declare function updateQty(userId: number, mealkitId: number, qty: number): Promise<null | undefined>;
export declare function deleteItem(userId: number, mealkitId: number): Promise<number | null>;
export declare function getFullCart(userId: number): Promise<{
    items: any[];
}>;
export declare function clearCart(userId: number): Promise<void>;
//# sourceMappingURL=cart.service.d.ts.map