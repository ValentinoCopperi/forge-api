"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../auth/middlewares/auth.middleware");
class UserRoutes {
    constructor(userController) {
        this.userController = userController;
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', auth_middleware_1.tokenMiddleware, (req, res) => this.userController.findAll(req, res));
        this.router.get('/:id', auth_middleware_1.tokenMiddleware, (req, res) => this.userController.findById(req, res));
        this.router.patch('/:id', auth_middleware_1.tokenMiddleware, (req, res) => this.userController.update(req, res));
    }
    getRouter() { return this.router; }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map