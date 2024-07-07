import { Server } from "socket.io";
let io: any;

export const init = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });
  return io;
}

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized..!");
  }
  return io;
}