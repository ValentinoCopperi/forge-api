import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
export declare class AuthRoutes {
    private readonly authController;
    private router;
    constructor(authController: AuthController);
    initRoutes(): void;
    getRouter(): Router;
}
