"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.roleMiddleware = exports.tokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const tokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log(req.user);
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
exports.uploadMiddleware = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});
//# sourceMappingURL=auth.middleware.js.map