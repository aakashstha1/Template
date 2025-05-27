import User from "../models/user.model.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";

// ----------------------------------------------Get Profile--------------------------------
export const getProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Profile fetching error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ----------------------------------------------Update Profile--------------------------------
export const updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, gender, bio, phone } = req.body;
  const imageFile = req.file;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (imageFile) {
      const uploadResponse = await uploadMedia(imageFile.path);
      user.imageUrl = uploadResponse.secure_url;
    }

    user.name = name || user.name;
    user.gender = gender || user.gender;
    user.bio = bio || user.bio;
    user.phone = phone || user.phone;

    await user.save();
    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.log("Profile update error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update profile" });
  }
};
