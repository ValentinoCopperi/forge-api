import { UserWithRole } from "../types/auth.types";
import { AuthRepository } from "../repositories/auth.repository";
import { StorageService } from "../../shared/libs/storage/storage.service";
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
    uploadAvatar(data: {
        userId: number;
        file: Express.Multer.File;
    }): Promise<UserWithRole>;
}
export declare class AuthService implements I_AuthService {
    private readonly authRepository;
    private readonly storageService;
    constructor(authRepository: AuthRepository, storageService: StorageService);
    uploadAvatar(data: {
        userId: number;
        file: Express.Multer.File;
    }): Promise<UserWithRole>;
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
