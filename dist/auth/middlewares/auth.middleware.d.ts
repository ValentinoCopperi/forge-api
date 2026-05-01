import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import multer from 'multer';
export declare const tokenMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const roleMiddleware: (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const rateLimitMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const uploadMiddleware: multer.Multer;
