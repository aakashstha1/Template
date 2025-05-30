import Community from "../models/community.model.js";
import User from "../models/user.model.js";

// Create a new community
export const createCommunity = async (req, res) => {
  const userId = req.userId;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const existing = await Community.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Community already exists" });
    }

    const community = new Community({
      name,
      members: [userId],
    });

    await community.save();

    await User.findByIdAndUpdate(userId, {
      $addToSet: { communities: community._id },
    });

    res.status(201).json({ message: "Community created", community });
  } catch (error) {
    console.error("Create Community Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Join a community
export const joinCommunity = async (req, res) => {
  const userId = req.userId;

  const { communityId } = req.body;

  if (!communityId || !userId) {
    return res
      .status(400)
      .json({ message: "Community ID and User ID are required" });
  }

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const alreadyMember = community.members.includes(userId);

    if (!alreadyMember) {
      community.members.push(userId);
      await community.save();

      await User.findByIdAndUpdate(userId, {
        $addToSet: { communities: community._id },
      });
    }

    res.status(200).json({
      message: alreadyMember ? "Already a member" : "Joined community",
      community,
    });
  } catch (error) {
    console.error("Join Community Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotJoinedCommunity = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const communities = await Community.find({
      members: { $nin: [userId] },
    }).populate("members", "name imageUrl");

    res.status(200).json(communities);
  } catch (error) {
    console.error("Fetch Communities Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get communities a user has joined
export const getUserCommunities = async (req, res) => {
  const { userId } = req.params;

  try {
    const communities = await Community.find({ members: userId });
    res.status(200).json(communities);
  } catch (error) {
    console.error("User Communities Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
