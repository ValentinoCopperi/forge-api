import { PrismaClient } from "@prisma/client";
import { UserWithRole } from "../types/auth.types";
interface I_AuthRepository {
    findById(id: number): Promise<UserWithRole | null>;
    updateAvatar(id: number, avatarUrl: string): Promise<UserWithRole>;
    findByEmail(email: string): Promise<UserWithRole | null>;
    findByEmailWithPassword(email: string): Promise<(UserWithRole & {
        passwordHash: string;
    }) | null>;
    createUser(data: {
        name: string;
        email: string;
        passwordHash: string;
    }): Promise<UserWithRole>;
    saveRefreshToken(data: {
        user_id: number;
        refresh_token: string;
        expires_at: Date;
    }): Promise<string>;
}
export declare class AuthRepository implements I_AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    saveRefreshToken(data: {
        user_id: number;
        refresh_token: string;
        expires_at: Date;
    }): Promise<string>;
    findById(id: number): Promise<UserWithRole | null>;
    updateAvatar(id: number, avatarUrl: string): Promise<UserWithRole>;
    findByEmail(email: string): Promise<UserWithRole | null>;
    findByEmailWithPassword(email: string): Promise<(UserWithRole & {
        passwordHash: string;
    }) | null>;
    createUser(data: {
        name: string;
        email: string;
        passwordHash: string;
    }): Promise<UserWithRole>;
}
export {};
