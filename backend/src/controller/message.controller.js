import Message from "../model/message.model.js";
import { User } from "../model/user.model.js";
import cloudinary from "../database/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );
    return res.status(200).json({ filteredUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessageBId = async (req, res) => {
  try {
    const loggedId = req.user._id;

    const { id } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: loggedId, receiverId: id },
        { senderId: id, receiverId: loggedId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMsg = async (req, res) => {
  try {
    const { text, image } = req.body;
    const loggedId = req.user.id;
    const { id } = req.params;
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const message = await Message.create({
      text,
      senderId: loggedId,
      receiverId: id,
      image: imageUrl,
    });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const chats = async (req, res) => {
  try {
    const loggedId = req.user._id;
    const message = await Message.find({
      $or: [{ senderId: loggedId }, { receiverId: loggedId }],
    });

    const chatPartnerIds = [
      ...new Set(
        message.map((msg) =>
          msg.senderId.toString() === loggedId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];
    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");
    return res.status(200).json(chatPartners);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
