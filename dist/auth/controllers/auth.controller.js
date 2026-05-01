"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_dto_1 = require("../dtos/auth.dto");
const AppError_1 = require("../../shared/errors/AppError");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async uploadAvatar(req, res) {
        const { file } = req;
        const userId = req.user.sub;
        if (!file)
            return res.status(400).json({ message: "File is required" });
        const result = await this.authService.uploadAvatar({ userId, file });
        return res.status(200).json({ data: result });
    }
    async register(req, res) {
        const body = auth_dto_1.registerSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({
                errors: body.error.flatten().fieldErrors,
            });
        }
        const user = await this.authService.register(body.data);
        return res.status(200).json({
            data: user,
        });
    }
    async login(req, res) {
        const body = auth_dto_1.loginSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({
                errors: body.error.flatten().fieldErrors,
            });
        }
        const { accessToken, refreshToken } = await this.authService.login(body.data);
        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    }
    async refreshToken(req, res) {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            throw new AppError_1.AppError(`Refresh token is not defined`, 409);
        }
        const { accessToken } = await this.authService.refresh(refresh_token);
        return res.status(200).json({
            accessToken,
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map