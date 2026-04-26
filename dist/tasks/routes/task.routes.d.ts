import { Router } from 'express';
import { TaskController } from '../controllers/tasks.controller';
export declare class TaskRoutes {
    private readonly taskController;
    private router;
    constructor(taskController: TaskController);
    private initRoutes;
    getRouter(): Router;
}
