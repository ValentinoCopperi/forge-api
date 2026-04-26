"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_dto_1 = require("../dtos/auth.dto");
const AppError_1 = require("../../shared/errors/AppError");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        try {
            const body = auth_dto_1.registerSchema.safeParse(req.body);
            if (!body.success) {
                return res.status(400).json({
                    errors: body.error.flatten().fieldErrors
                });
            }
            const user = await this.authService.register(body.data);
            return res.status(200).json({
                data: user
            });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async login(req, res) {
        try {
            const body = auth_dto_1.loginSchema.safeParse(req.body);
            if (!body.success) {
                return res.status(400).json({
                    errors: body.error.flatten().fieldErrors
                });
            }
            const { accessToken, refreshToken } = await this.authService.login(body.data);
            return res.status(200).json({
                accessToken, refreshToken
            });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map