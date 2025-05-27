import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on Port no:${PORT}`);
});
