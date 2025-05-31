import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import app from "./app.js";
import http from "http";
import { initSocket } from "./socket.io/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create the HTTP server from Express app
const server = http.createServer(app);

// Initialize socket with the server
initSocket(server);

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on Port no:${PORT}`);
});
