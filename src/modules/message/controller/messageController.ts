import express from "express";
import {
  createMessages,
  getAllMessages,
  getMessageById,
  deleteMessageById,
} from "../repository/messageRepo";

export const createMessage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, contact, email, message } = req.body;
    const newMessage = await createMessages({ name, contact, email, message });
    return res.status(200).json({
      message: "Message sent",
      data: newMessage,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const viewMessages = async (
  req: express.Request,
  res: express.Response
) => {
  const allMessages = await getAllMessages();
  return res.status(200).json({
    status: true,
    message: allMessages,
  });
};

export const deleteMessage = async (
  req: express.Request,
  res: express.Response
) => {
    const messageById = req.params.id;
    const existingMessage = await getMessageById(messageById);

    if (!existingMessage) {
      return res.status(500).json({
        status: false,
        message: "message doesn't exist"
      });
    }
    const deletedMessage = await deleteMessageById(messageById);
    return res.status(200).json({
      status: true,
      message: deletedMessage,
    });
};
