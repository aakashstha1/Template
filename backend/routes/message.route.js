import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { getMessages, postMessage } from "../controllers/message.controller.js";

const router = express.Router();
router.get("/:room", verifyToken, getMessages);
router.post("/", verifyToken, postMessage);

export default router;
