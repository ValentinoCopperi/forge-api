import { PrismaClient } from "@prisma/client";
import { AuthRepository } from "./repositories/auth.repository";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthRoutes } from "./routes/auth.routes";
import { StorageService } from './../shared/libs/storage/storage.service';

export const createAuthModule = (prisma: PrismaClient) => {
    const repository = new AuthRepository(prisma)
    const storageService = new StorageService()
    const service = new AuthService(repository,storageService)
    const controller = new AuthController(service)
    const routes = new AuthRoutes(controller)
    return routes.getRouter()
}
