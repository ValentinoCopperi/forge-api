/// <reference path="./shared/types/express/index.d.ts" />
import application = require("express");
import { createServer } from "http";
import { getSocket, initSocket } from "./shared/libs/sockets/socket";
import path from "path";
import { NotificationsRoutes } from "./notifications/routes/notifications.routes";
import {
  getPrismaClient,
  initPrisma,
} from "./shared/libs/prisma/prisma.connection";
import { createTaskModule } from "./tasks/module";
import express from "express";
import { createAuthModule } from "./auth/module";
import { initRedis } from "./shared/libs/redis/redis.connection";
import { ErrorRequestHandler } from "./shared/middleware/error-request-handler";
import { tokenMiddleware } from "./auth/middlewares/auth.middleware";
import { envs } from "./shared/configs/env.config";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";

function boostrap() {
  const app = application();

  app.use(express.json());

  //Middlware aplicado globalmente
  app.use(LoggerMiddleware);

  const httpServer = createServer(app);

  initSocket(httpServer);
  initPrisma();
  initRedis();

  const io = getSocket();
  const prisma = getPrismaClient();

  const notificationsRouter = new NotificationsRoutes(io);

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/tasks", tokenMiddleware, createTaskModule(prisma));
  app.use("/api/auth", createAuthModule(prisma));
  app.use("/api/notifications", notificationsRouter.getRouter());

  app.get("/client", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client.html"));
  });

  //Middlware de para capturar errores global
  app.use(ErrorRequestHandler);

  httpServer.listen(envs.APP_PORT, () => {
    console.log("App listening on", envs.APP_PORT);
  });
}

boostrap();
