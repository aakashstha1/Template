import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  replyPost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/posts", verifyToken, getAllPosts);
router.get("/my-posts", verifyToken, getMyPosts);

router.post("/:postId/reply", verifyToken, replyPost);

export default router;
