import { UserRepository } from "../repositories/user.repository";
import { UserWithRoles } from "../types/user.types";
interface I_UserService {
    findAll(): Promise<UserWithRoles[]>;
    findById(id: number): Promise<UserWithRoles>;
    update(id: number, data: {
        name?: string;
        avatarUrl?: string;
    }): Promise<UserWithRoles>;
}
export declare class UserService implements I_UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findAll(): Promise<UserWithRoles[]>;
    findById(id: number): Promise<UserWithRoles>;
    update(id: number, data: {
        name?: string;
        avatarUrl?: string;
    }): Promise<UserWithRoles>;
}
export {};
