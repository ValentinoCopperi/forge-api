import { Server } from "socket.io";
export declare const initSocket: (httpServer: any) => void;
export declare const getSocket: () => Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
