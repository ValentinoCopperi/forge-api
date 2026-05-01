import { Task } from "@prisma/client";
import { TaskRepository } from "../repositories/tasks.repository";
import { TaskWithUser } from "../types/tasks.types";
import Redis from "ioredis";
interface I_TaskService {
    findAllOffsetPaginated(data: {
        page: number;
        limit: number;
    }): Promise<{
        data: TaskWithUser[];
        pagination: {
            totalPages: number;
            currentPage: number;
            totalItems: number;
        };
    }>;
    findAllCursorPaginated(data: {
        cursor?: number;
        limit?: number;
    }): Promise<{
        data: TaskWithUser[];
        nextCursor: number | null;
    }>;
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
}
export declare class TaskService implements I_TaskService {
    private readonly taskRepository;
    private readonly redisClient;
    constructor(taskRepository: TaskRepository, redisClient: Redis);
    findAllOffsetPaginated(data: {
        page: number;
        limit: number;
    }): Promise<{
        data: TaskWithUser[];
        pagination: {
            currentPage: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    findAllCursorPaginated(data: {
        cursor?: number;
        limit?: number;
    }): Promise<{
        data: TaskWithUser[];
        nextCursor: number | null;
    }>;
    findAll(): Promise<TaskWithUser[]>;
    create(data: {
        title: string;
        userId: number;
    }): Promise<Task>;
}
export {};
