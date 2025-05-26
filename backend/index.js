import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extends: true }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on Port no:${PORT}`);
});
