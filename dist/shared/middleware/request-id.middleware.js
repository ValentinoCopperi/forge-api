"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestIdMiddleware = void 0;
const crypto_1 = __importDefault(require("crypto"));
const RequestIdMiddleware = (req, res, next) => {
    const request_id = crypto_1.default.randomUUID();
    req.request_id = request_id;
    res.setHeader("X-Request-Id", request_id);
    next();
};
exports.RequestIdMiddleware = RequestIdMiddleware;
//# sourceMappingURL=request-id.middleware.js.map