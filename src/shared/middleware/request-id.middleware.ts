import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const RequestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const request_id = crypto.randomUUID();

  req.request_id = request_id;
  res.setHeader("X-Request-Id", request_id);

  next();
};
