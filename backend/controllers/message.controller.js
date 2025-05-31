import Message from "../models/message.model.js";
import Community from "../models/community.model.js"; // ← make sure this is imported

// GET messages (only if user is a member)
export const getCommunityMessages = async (req, res) => {
  const { communityId } = req.params;
  const userId = req.userId;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const isMember = community.members.includes(userId);
    if (!isMember) {
      return res
        .status(403)
        .json({ error: "Access denied. Not a member of this community." });
    }

    const messages = await Message.find({ community: communityId })
      .populate("sender", "name imageUrl")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST message (only if user is a member)
export const sendMessage = async (req, res) => {
  const senderId = req.userId;
  const { communityId, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Message content is required" });
  }

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const isMember = community.members.includes(senderId);
    if (!isMember) {
      return res
        .status(403)
        .json({ error: "You are not a member of this community" });
    }

    const message = await Message.create({
      sender: senderId,
      community: communityId,
      content,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
