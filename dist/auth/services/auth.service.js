"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async register(data) {
        const { name, email, password } = data;
        if (await this.authRepository.findByEmail(email))
            throw new AppError_1.AppError(`${email} is already used`, 409);
        try {
            const hashedPassword = bcrypt_1.default.hashSync(password, 10);
            return await this.authRepository.createUser({
                name,
                email,
                passwordHash: hashedPassword
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Unexpected error");
        }
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
            roles: user.userRoles.map(r => r.role)
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        const token = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const { sub, email, roles } = token;
        const payload = {
            sub,
            email,
            roles
        };
        const newAcessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
        return { accessToken: newAcessToken };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map