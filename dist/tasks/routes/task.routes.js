"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../auth/middlewares/auth.middleware");
const client_1 = require("@prisma/client");
class TaskRoutes {
    constructor(taskController) {
        this.taskController = taskController;
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', auth_middleware_1.tokenMiddleware, (req, res) => this.taskController.findAll(req, res));
        this.router.post('/', auth_middleware_1.tokenMiddleware, (0, auth_middleware_1.roleMiddleware)([client_1.Role.DIRECTOR]), (req, res) => this.taskController.create(req, res));
        this.router.get('/fast', (req, res) => {
            res.json({ message: "pong", timestamp: Date.now() });
        });
        this.router.get('/block/:ms_to_block', (req, res) => {
            const { ms_to_block } = req.params;
            if (!ms_to_block)
                res.status(400).json({ error: 'ms_to_block is required' });
            const end = Date.now() + Number(ms_to_block);
            while (Date.now() < end) {
            }
            return res.status(200).json({ message: 'Finished!' });
        });
        this.router.get('/async', (req, res) => {
            setTimeout(() => {
                return res.status(200).json({ message: 'Finished!' });
            }, 5000);
        });
    }
    getRouter() { return this.router; }
}
exports.TaskRoutes = TaskRoutes;
//# sourceMappingURL=task.routes.js.map