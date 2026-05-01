import { Router } from "express";
import { DefaultEventsMap, Server } from "socket.io";
type IoServer = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export declare class NotificationsRoutes {
    private router;
    private io;
    constructor(io_: IoServer);
    initRoutes(): void;
    getRouter(): Router;
}
export {};
