import { PrismaClient, Task } from "@prisma/client";
import { TaskWithUser } from "../types/tasks.types";
interface I_TaskRepository {
    count(): Promise<number>;
    findAllOffsetPaginated(data: {
        page: number;
        limit: number;
    }): Promise<TaskWithUser[]>;
    findAllCursorPaginated(data: {
        cursor?: number;
        limit?: number;
    }): Promise<TaskWithUser[]>;
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
    findByTitle(title: string): Promise<boolean>;
}
export declare class TaskRepository implements I_TaskRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    count(): Promise<number>;
    findAllOffsetPaginated(data: {
        page: number;
        limit: number;
    }): Promise<TaskWithUser[]>;
    findAllCursorPaginated(data: {
        cursor?: number;
        limit?: number;
    }): Promise<TaskWithUser[]>;
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
    findByTitle(title: string): Promise<boolean>;
}
export {};
