"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthRoutes {
    constructor(authController) {
        this.authController = authController;
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(`/create`, (req, res) => this.authController.register(req, res));
        this.router.post(`/refresh`, (req, res) => this.authController.refreshToken(req, res));
        this.router.post(`/signin`, auth_middleware_1.rateLimitMiddleware, (req, res) => this.authController.login(req, res));
        this.router.post("/uploadAvatar", auth_middleware_1.tokenMiddleware, auth_middleware_1.uploadMiddleware.single("avatar"), (req, res) => this.authController.uploadAvatar(req, res));
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.routes.js.map