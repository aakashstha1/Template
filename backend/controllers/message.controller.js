import Message from "../models/message.model.js";

export const getCommunityMessages = async (req, res) => {
  const { communityId } = req.params;
  try {
    const messages = await Message.find({ community: communityId })
      .populate("sender", "name imageUrl")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  const { senderId, communityId, content } = req.body;
  try {
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
