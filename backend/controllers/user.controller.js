import User from "../models/user.model.js";
import { submitMessage } from "../nodemailer/emails.js";
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
  const { name, bio, phone } = req.body;
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
    // user.gender = gender || user.gender;
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

// ----------------------------------------------Contact--------------------------------
export const sendMsg = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  try {
    await submitMessage(name, email, phone, message);
    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

// ----------------------------------------------Search--------------------------------


export const searchQuery = async (req, res) => {
  try {
    const { query = "", categories = "", sortByPrice = "" } = req.query;
    const categoriesArray =
      typeof categories === "string"
        ? categories.split(",").filter(Boolean)
        : [];

    //CREATE QUERY SEARCH
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
    // console.log("Search Criteria before adding categories:", searchCriteria);
    //CATEGORY SELECTED
    if (categoriesArray.length > 0) {
      searchCriteria.category = { $in: categoriesArray };
    }
    // console.log("Search Criteria after adding categories:", searchCriteria);
    //SORT ORDER
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //SORT BY PRICE IN ASCENDING ORDER
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; //SORT BY PRICE IN DESCENDING ORDER
    }
    // console.log("Final Search Criteria:", searchCriteria);

    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);
    // console.log("Courses fetched from database:", courses);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Search failed" });
  }
};