import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
export declare class UserRoutes {
    private readonly userController;
    private router;
    constructor(userController: UserController);
    private initRoutes;
    getRouter(): Router;
}
