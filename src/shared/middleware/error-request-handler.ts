import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { logger } from "../libs/logger/logger";

/*
Express detecta que es un error handler por la firma de 4 parámetros — (err, req, res, next). Si le sacás el err y dejás solo 3, Express lo trata como middleware normal y nunca lo invoca para errores.
*/
export const ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.error({
      error: err.message,
      status: err.statusCode,
      request_id: req.request_id,
    });
    return res.status(err.statusCode).json({ error: err.message });
  }
  logger.error({
    error: `${err}`,
    request_id: req.request_id,
  });
  return res.status(500).json({ error: "Internal server error" });
};
