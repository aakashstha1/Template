import { Server } from "socket.io";

let io;

export function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // Replace with frontend origin in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Example event
    socket.on("sendMessage", (message) => {
      io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

export { io };
