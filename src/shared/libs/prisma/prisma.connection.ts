import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export const initPrisma = async () => {
  if (!prisma) {
    try {
      prisma = new PrismaClient();

      await prisma.$connect();

      console.log("✅ Prisma conectado correctamente a la base de datos");
    } catch (error) {
      console.error("❌ Error al conectar Prisma:", error);
      throw error;
    }
  }
};

export const getPrismaClient = () => {
  if (!prisma) {
    const errorMsg = "❌ Prisma no está inicializado. Llamá primero a initPrisma()";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return prisma;
};