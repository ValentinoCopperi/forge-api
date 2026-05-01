"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../../shared/configs/env.config");
class AuthService {
    constructor(authRepository, storageService) {
        this.authRepository = authRepository;
        this.storageService = storageService;
    }
    async uploadAvatar(data) {
        const { userId, file } = data;
        const user = await this.authRepository.findById(userId);
        if (!user)
            throw new AppError_1.AppError(`User with ID ${userId} not found`, 404);
        const { id, avatarUrl } = user;
        if (avatarUrl) {
            const key = avatarUrl.split(`${env_config_1.envs.S3_BUCKET}/`)[1];
            await this.storageService.deleteFile(key);
        }
        const key = this.storageService.createKey(file.originalname, id);
        const url = await this.storageService.uploadFile(file, key);
        return await this.authRepository.updateAvatar(userId, url);
    }
    async register(data) {
        const { name, email, password } = data;
        if (await this.authRepository.findByEmail(email))
            throw new AppError_1.AppError(`${email} is already used`, 409);
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        return await this.authRepository.createUser({
            name,
            email,
            passwordHash: hashedPassword,
        });
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.authRepository.findByEmailWithPassword(email);
        if (!user)
            throw new AppError_1.AppError("User not found", 401);
        const isValid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isValid)
            throw new AppError_1.AppError("Invalid credentials", 401);
        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.userRoles.map((r) => r.role),
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, env_config_1.envs.JWT_SECRET, {
            expiresIn: "10s",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, env_config_1.envs.JWT_REFRESH_SECRET, {
            expiresIn: "7d",
        });
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        const token = jsonwebtoken_1.default.verify(refreshToken, env_config_1.envs.JWT_REFRESH_SECRET);
        const { sub, email, roles } = token;
        const payload = {
            sub,
            email,
            roles,
        };
        const newAcessToken = jsonwebtoken_1.default.sign(payload, env_config_1.envs.JWT_SECRET, {
            expiresIn: "15m",
        });
        return { accessToken: newAcessToken };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map