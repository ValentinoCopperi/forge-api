import { Request, Response } from 'express';
import { UserService } from "../services/user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
