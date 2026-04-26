import { PrismaClient } from "@prisma/client"
import { TaskController } from "./controllers/tasks.controller"
import { TaskRepository } from "./repositories/tasks.repository"
import { TaskRoutes } from "./routes/task.routes"
import { TaskService } from "./services/task.service"
import { getRedisClient } from "../shared/libs/redis/redis.connection"


export const createTaskModule = (prisma: PrismaClient) => {
    const repository = new TaskRepository(prisma)
    const service = new TaskService(repository, getRedisClient())
    const controller = new TaskController(service)
    const routes = new TaskRoutes(controller)
    return routes.getRouter()
}
