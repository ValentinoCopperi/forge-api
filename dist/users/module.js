"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserModule = void 0;
const user_repository_1 = require("./repositories/user.repository");
const user_service_1 = require("./services/user.service");
const user_controller_1 = require("./controllers/user.controller");
const user_routes_1 = require("./routes/user.routes");
const createUserModule = (prisma) => {
    const repository = new user_repository_1.UserRepository(prisma);
    const service = new user_service_1.UserService(repository);
    const controller = new user_controller_1.UserController(service);
    const routes = new user_routes_1.UserRoutes(controller);
    return routes.getRouter();
};
exports.createUserModule = createUserModule;
//# sourceMappingURL=module.js.map