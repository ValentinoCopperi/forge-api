"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
class AuthRoutes {
    constructor(authController) {
        this.authController = authController;
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(`/create`, (req, res) => this.authController.register(req, res));
        this.router.post(`/signin`, (req, res) => this.authController.login(req, res));
    }
    getRouter() { return this.router; }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.routes.js.map