import { Server } from "socket.io";

let io: Server | null = null;

export const initSocket = (httpServer: any) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
}

export const getSocket = () => {

    if( !io ) throw new Error('Socket no inicializado. Llamá initSocket primero.');

    return io;

}
