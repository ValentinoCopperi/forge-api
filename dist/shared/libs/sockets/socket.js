"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
const initSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
};
exports.initSocket = initSocket;
const getSocket = () => {
    if (!io)
        throw new Error('Socket no inicializado. Llamá initSocket primero.');
    return io;
};
exports.getSocket = getSocket;
//# sourceMappingURL=socket.js.map