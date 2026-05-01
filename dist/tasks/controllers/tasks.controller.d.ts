import { TaskService } from "../services/task.service";
import { Request, Response } from 'express';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAllOffsetPaginated(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllCursorPaginated(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
