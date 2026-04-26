import { UserWithRole } from "../types/auth.types";
import { AuthRepository } from '../repositories/auth.repository';
interface I_AuthService {
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<UserWithRole>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
export declare class AuthService implements I_AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<UserWithRole>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
export {};
