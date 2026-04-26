import { Request, Response, NextFunction } from 'express'


export const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {


    const executeTime = new Date();


    res.on("finish", () => {

        const duration = new Date().getTime() - executeTime.getTime();

        console.log(`[${executeTime}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms`)

    })

    next();
}