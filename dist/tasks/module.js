"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskModule = void 0;
const tasks_controller_1 = require("./controllers/tasks.controller");
const tasks_repository_1 = require("./repositories/tasks.repository");
const task_routes_1 = require("./routes/task.routes");
const task_service_1 = require("./services/task.service");
const redis_connection_1 = require("../shared/libs/redis/redis.connection");
const createTaskModule = (prisma) => {
    const repository = new tasks_repository_1.TaskRepository(prisma);
    const service = new task_service_1.TaskService(repository, (0, redis_connection_1.getRedisClient)());
    const controller = new tasks_controller_1.TaskController(service);
    const routes = new task_routes_1.TaskRoutes(controller);
    return routes.getRouter();
};
exports.createTaskModule = createTaskModule;
//# sourceMappingURL=module.js.map