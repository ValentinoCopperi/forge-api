import { PrismaClient, Task } from "@prisma/client";
import { TaskWithUser } from "../types/tasks.types";
interface I_TaskRepository {
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
}
export declare class TaskRepository implements I_TaskRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
}
export {};
