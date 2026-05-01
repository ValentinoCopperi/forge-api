"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./shared/types/express/index.d.ts" />
const application = require("express");
const http_1 = require("http");
const socket_1 = require("./shared/libs/sockets/socket");
const path_1 = __importDefault(require("path"));
const notifications_routes_1 = require("./notifications/routes/notifications.routes");
const prisma_connection_1 = require("./shared/libs/prisma/prisma.connection");
const module_1 = require("./tasks/module");
const express_1 = __importDefault(require("express"));
const module_2 = require("./auth/module");
const redis_connection_1 = require("./shared/libs/redis/redis.connection");
const error_request_handler_1 = require("./shared/middleware/error-request-handler");
const auth_middleware_1 = require("./auth/middlewares/auth.middleware");
const env_config_1 = require("./shared/configs/env.config");
const logger_middleware_1 = require("./shared/middleware/logger.middleware");
const request_id_middleware_1 = require("./shared/middleware/request-id.middleware");
const health_routes_1 = require("./health/routes/health.routes");
const API_PREFIX = `/api/v1`;
function boostrap() {
    const app = application();
    app.use(express_1.default.json());
    //Middleware para requests ids global
    app.use(request_id_middleware_1.RequestIdMiddleware);
    //Middlware aplicado globalmente
    app.use(logger_middleware_1.LoggerMiddleware);
    const httpServer = (0, http_1.createServer)(app);
    (0, socket_1.initSocket)(httpServer);
    (0, prisma_connection_1.initPrisma)();
    (0, redis_connection_1.initRedis)();
    const io = (0, socket_1.getSocket)();
    const prisma = (0, prisma_connection_1.getPrismaClient)();
    const notificationsRouter = new notifications_routes_1.NotificationsRoutes(io);
    const healthRouter = new health_routes_1.HealthRoutes(prisma, (0, redis_connection_1.getRedisClient)());
    app.use(`${API_PREFIX}/health`, healthRouter.getRouter());
    app.use("/api/tasks", auth_middleware_1.tokenMiddleware, (0, module_1.createTaskModule)(prisma));
    app.use("/api/notifications", auth_middleware_1.tokenMiddleware, notificationsRouter.getRouter());
    app.use("/api/auth", (0, module_2.createAuthModule)(prisma));
    app.get("/client", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "..", "client.html"));
    });
    //Middlware de para capturar errores global
    app.use(error_request_handler_1.ErrorRequestHandler);
    httpServer.listen(env_config_1.envs.APP_PORT, () => {
        console.log("App listening on", env_config_1.envs.APP_PORT);
    });
}
boostrap();
//# sourceMappingURL=index.js.map