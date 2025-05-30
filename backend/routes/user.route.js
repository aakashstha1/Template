import express from "express";
import {
  getProfile,
  searchQuery,
  sendMsg,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put(
  "/profile/update",
  verifyToken,
  upload.single("imageUrl"),
  updateProfile
);
router.post("/contact", sendMsg);

router.get("/search", verifyToken, searchQuery);

export default router;
