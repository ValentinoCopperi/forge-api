import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    uploadAvatar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
