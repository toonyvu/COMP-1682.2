type userInformation = {
    id: number;
    role: string;
    username: string;
    tier: string | "free" | "premium" | "deluxe";
    email: string;
    bio: string;
    avatar_url: string;
    dob: Date;
    created_at: Date;
    address: string;
    first_name: string;
    last_name: string;
    phone: string;
    gender: string;
};
export declare function getUserInfo(id: number): Promise<any>;
export declare function updateUserInfo({ id, role, username, tier, email, bio, avatar_url, dob, created_at, address, first_name, last_name, phone, gender, }: userInformation): Promise<any>;
export {};
//# sourceMappingURL=users.service.d.ts.map