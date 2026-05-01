"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const logger_1 = require("../libs/logger/logger");
const LoggerMiddleware = (req, res, next) => {
    const executeTime = new Date();
    res.on("finish", () => {
        const duration = new Date().getTime() - executeTime.getTime();
        if (res.statusCode === 200) {
            logger_1.logger.info({
                request_id: req.request_id,
                method: req.method,
                url: req.url,
                statusCode: res.statusCode,
                duration,
            });
        }
    });
    next();
};
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map