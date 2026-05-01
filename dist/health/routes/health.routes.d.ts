import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import Redis from "ioredis";
export declare class HealthRoutes {
    private router;
    private prisma;
    private redis;
    constructor(prisma_c: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, redis_c: Redis);
    initRoutes(): void;
    getRouter(): Router;
}
