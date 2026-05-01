import { PrismaClient } from "@prisma/client";
export declare const initPrisma: () => Promise<void>;
export declare const getPrismaClient: () => PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
