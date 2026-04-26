"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsRoutes = void 0;
const express_1 = require("express");
const socket_1 = require("../../shared/libs/sockets/socket");
class NotificationsRoutes {
    constructor() {
        this.notificationsPrefix = 'notifications';
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(`/${this.notificationsPrefix}/:socketId`, (req, res) => {
            const { socketId } = req.params;
            if (!socketId)
                throw new Error('SocketId is required');
            const io = (0, socket_1.getSocket)();
            io.to(socketId).emit('notification', {
                message: `Hello user ${socketId}!`
            });
            res.status(200).json({ message: 'Notificación enviada' });
        });
    }
    getRouter() { return this.router; }
}
exports.NotificationsRoutes = NotificationsRoutes;
//# sourceMappingURL=notifications.routes.js.map