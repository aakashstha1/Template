import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).populate(
      "sender",
      "username"
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

export const postMessage = async (req, res) => {
  try {
    const { room, content } = req.body;
    const newMessage = new Message({
      room,
      content,
      sender: req.user.id,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};
