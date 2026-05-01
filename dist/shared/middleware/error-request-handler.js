"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRequestHandler = void 0;
const AppError_1 = require("../errors/AppError");
const logger_1 = require("../libs/logger/logger");
/*
Express detecta que es un error handler por la firma de 4 parámetros — (err, req, res, next). Si le sacás el err y dejás solo 3, Express lo trata como middleware normal y nunca lo invoca para errores.
*/
const ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        logger_1.logger.error({
            error: err.message,
            status: err.statusCode,
            request_id: req.request_id,
        });
        return res.status(err.statusCode).json({ error: err.message });
    }
    logger_1.logger.error({
        error: `${err}`,
        request_id: req.request_id,
    });
    return res.status(500).json({ error: "Internal server error" });
};
exports.ErrorRequestHandler = ErrorRequestHandler;
//# sourceMappingURL=error-request-handler.js.map