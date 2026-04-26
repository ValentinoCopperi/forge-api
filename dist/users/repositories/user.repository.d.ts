import { PrismaClient } from "@prisma/client";
import { UserWithRoles } from "../types/user.types";
interface I_UserRepository {
    findAll(): Promise<UserWithRoles[]>;
    findById(id: number): Promise<UserWithRoles | null>;
    update(id: number, data: {
        name?: string;
        avatarUrl?: string;
    }): Promise<UserWithRoles>;
}
export declare class UserRepository implements I_UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAll(): Promise<UserWithRoles[]>;
    findById(id: number): Promise<UserWithRoles | null>;
    update(id: number, data: {
        name?: string;
        avatarUrl?: string;
    }): Promise<UserWithRoles>;
}
export {};
