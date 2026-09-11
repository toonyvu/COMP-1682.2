import type { mealkitData } from "../types/types.js";
export declare function getAllMealkits(page: number, limit: number, week: number, search: string, ids: number[]): Promise<{
    mealkits: any[];
    total: number;
    page: number;
    limit: number;
}>;
export declare function createMealkit(mealkitData: mealkitData): Promise<any[]>;
//# sourceMappingURL=mealkits.service.d.ts.map