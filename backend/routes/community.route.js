import express from "express";
import {
  createCommunity,
  joinCommunity,
  getUserCommunities,
  getNotJoinedCommunity,
} from "../controllers/community.controller.js";
import {
  getCommunityMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Community routes
router.post("/create", verifyToken, createCommunity);
router.post("/join", verifyToken, joinCommunity);
router.get("/:userId/communities", verifyToken, getUserCommunities);
router.get("/all", verifyToken, getNotJoinedCommunity);

// Chat routes
router.get("/:communityId/messages", verifyToken, getCommunityMessages);
router.post("/message/send", verifyToken, sendMessage);

export default router;
