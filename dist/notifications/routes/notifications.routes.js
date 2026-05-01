"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsRoutes = void 0;
const express_1 = require("express");
const AppError_1 = require("../../shared/errors/AppError");
class NotificationsRoutes {
    constructor(io_) {
        this.router = (0, express_1.Router)();
        this.io = io_;
        this.initRoutes();
    }
    initRoutes() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado:', socket.id);
            socket.on('disconnect', () => {
                console.log('Cliente desconectado:', socket.id);
            });
        });
        this.router.post(`/:socketId`, (req, res) => {
            const { socketId } = req.params;
            if (!socketId)
                throw new AppError_1.AppError('SocketId is required', 500);
            this.io.to(socketId).emit('notification', {
                message: `Hello user ${socketId}!`
            });
            res.status(200).json({ message: 'Notificación enviada' });
        });
    }
    getRouter() { return this.router; }
}
exports.NotificationsRoutes = NotificationsRoutes;
//# sourceMappingURL=notifications.routes.js.map