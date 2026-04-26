import { Task } from "@prisma/client";
import { TaskRepository } from "../repositories/tasks.repository";
import { TaskWithUser } from "../types/tasks.types";
interface I_TaskService {
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
}
export declare class TaskService implements I_TaskService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
}
export {};
