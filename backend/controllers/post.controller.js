import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Reply from "../models/reply.model.js";

// ---------------------------------------------------Create Post----------------------------------------------------

export const createPost = async (req, res) => {
  const userId = req.userId;
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      author: user._id,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

// ---------------------------------------------------Get All posts----------------------------------------------------

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name imageUrl")
      .populate({
        path: "replies",
        populate: { path: "user", select: "name imageUrl" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Get all posts error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

// ---------------------------------------------------get My Posts----------------------------------------------------

export const getMyPosts = async (req, res) => {
  const userId = req.userId;
  try {
    const posts = await Post.find({ author: userId })
      .populate({
        path: "replies",
        populate: { path: "user", select: "name imageUrl" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Get my posts error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

// ---------------------------------------------------Reply----------------------------------------------------

export const replyPost = async (req, res) => {
  const userId = req.userId;
  const { msg } = req.body;
  const postId = req.params.postId;

  try {
    if (!msg) {
      return res.status(400).json({
        success: false,
        message: "Cannot post empty message!",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const newReply = new Reply({
      msg: msg.trim(),
      post: postId,
      user: user._id,
    });

    await newReply.save();

    // Update Post
    post.replies.push(newReply._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Reply posted successfully",
      reply: newReply,
    });
  } catch (error) {
    console.error("Reply post error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
