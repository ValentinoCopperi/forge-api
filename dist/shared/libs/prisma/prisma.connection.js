"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = exports.initPrisma = void 0;
const client_1 = require("@prisma/client");
let prisma;
const initPrisma = async () => {
    if (!prisma) {
        try {
            prisma = new client_1.PrismaClient();
            await prisma.$connect();
            console.log("✅ Prisma conectado correctamente a la base de datos");
        }
        catch (error) {
            console.error("❌ Error al conectar Prisma:", error);
            throw error;
        }
    }
};
exports.initPrisma = initPrisma;
const getPrismaClient = () => {
    if (!prisma) {
        const errorMsg = "❌ Prisma no está inicializado. Llamá primero a initPrisma()";
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
    return prisma;
};
exports.getPrismaClient = getPrismaClient;
//# sourceMappingURL=prisma.connection.js.map