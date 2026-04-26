"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthModule = void 0;
const auth_repository_1 = require("./repositories/auth.repository");
const auth_service_1 = require("./services/auth.service");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_routes_1 = require("./routes/auth.routes");
const createAuthModule = (prisma) => {
    const repository = new auth_repository_1.AuthRepository(prisma);
    const service = new auth_service_1.AuthService(repository);
    const controller = new auth_controller_1.AuthController(service);
    const routes = new auth_routes_1.AuthRoutes(controller);
    return routes.getRouter();
};
exports.createAuthModule = createAuthModule;
//# sourceMappingURL=module.js.map