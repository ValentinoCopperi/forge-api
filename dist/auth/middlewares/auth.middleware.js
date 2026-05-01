"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.rateLimitMiddleware = exports.roleMiddleware = exports.tokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const redis_connection_1 = require("../../shared/libs/redis/redis.connection");
const env_config_1 = require("../../shared/configs/env.config");
const tokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_config_1.envs.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.tokenMiddleware = tokenMiddleware;
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        const roles_request = req.user.roles;
        const hasRole = roles.some(r => roles_request.includes(r));
        if (!hasRole)
            return res.status(403).json({ message: `Forbidden. ${roles.map(r => r + " ")} are the only ones allowed` });
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
const MAX_IP_REQUEST = env_config_1.envs.MAX_IP_REQUEST;
const rateLimitMiddleware = async (req, res, next) => {
    const redisClient = (0, redis_connection_1.getRedisClient)();
    const ip = req.ip;
    const ip_requests_count = await redisClient.get(`requests_${ip}`);
    if (ip_requests_count) {
        let parsed_ip_count = parseInt(ip_requests_count);
        if (parsed_ip_count < Number(MAX_IP_REQUEST)) {
            await redisClient.incr(`requests_${ip}`);
            return next();
        }
        else {
            return res.status(429).json({ message: `Too many requests` });
        }
    }
    await redisClient.set(`requests_${ip}`, 1, 'EX', 20);
    next();
};
exports.rateLimitMiddleware = rateLimitMiddleware;
exports.uploadMiddleware = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});
//# sourceMappingURL=auth.middleware.js.map