import { PrismaClient } from "@prisma/client";
import { UserWithRole } from "../types/auth.types";
interface I_AuthRepository {
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
export declare class AuthRepository implements I_AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
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
