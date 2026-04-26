"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types/express/index.d.ts" />
const application = require("express");
const http_1 = require("http");
const socket_1 = require("./shared/libs/sockets/socket");
const path_1 = __importDefault(require("path"));
const notifications_routes_1 = require("./notifications/routes/notifications.routes");
const prisma_connection_1 = require("./shared/libs/prisma/prisma.connection");
const module_1 = require("./tasks/module");
const express_1 = __importDefault(require("express"));
const module_2 = require("./auth/module");
const module_3 = require("./users/module");
const PORT = 3001;
function boostrap() {
    const app = application();
    app.use(express_1.default.json());
    const notificationsRouter = new notifications_routes_1.NotificationsRoutes();
    const httpServer = (0, http_1.createServer)(app);
    (0, socket_1.initSocket)(httpServer);
    (0, prisma_connection_1.initPrisma)();
    const io = (0, socket_1.getSocket)();
    const prisma = (0, prisma_connection_1.getPrismaClient)();
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok' });
    });
    app.use('/api/tasks', (0, module_1.createTaskModule)(prisma));
    app.use('/api/auth', (0, module_2.createAuthModule)(prisma));
    app.use('/api/users', (0, module_3.createUserModule)(prisma));
    app.use('/api', notificationsRouter.getRouter());
    app.get('/client', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '..', 'client.html'));
    });
    httpServer.listen(PORT, () => {
        console.log('App listening on', PORT);
    });
}
boostrap();
//# sourceMappingURL=index.js.map