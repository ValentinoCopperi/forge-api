"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = exports.initPrisma = void 0;
const client_1 = require("@prisma/client");
let prisma;
const initPrisma = () => {
    if (!prisma) {
        prisma = new client_1.PrismaClient();
    }
};
exports.initPrisma = initPrisma;
const getPrismaClient = () => {
    if (!prisma) {
        throw new Error("Prisma is not initialized yet");
    }
    return prisma;
};
exports.getPrismaClient = getPrismaClient;
//# sourceMappingURL=prisma.connection.js.map