import type { Profile } from "passport";
export declare function login(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: any;
    role: any;
}>;
export declare function signup(username: string, email: string, password: string): Promise<any>;
export declare function findOrCreateExistingUser(profile: Profile): Promise<any>;
export declare function storeRefreshToken(userId: number, refreshToken: string): Promise<void>;
export declare function getRefreshToken(refreshToken: string): Promise<any>;
export declare function deleteRefreshToken(refreshToken: string): Promise<void>;
export declare function resetPassword(password: string, token: string): Promise<void>;
export declare function forgotPassword(email: string): Promise<void>;
//# sourceMappingURL=auth.service.d.ts.map