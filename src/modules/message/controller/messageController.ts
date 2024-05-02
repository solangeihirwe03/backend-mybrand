import express from 'express';
import { createMessages, getAllMessages, getMessageById, deleteMessageById } from '../repository/messageRepo';

export const createMessage = async (req: express.Request, res: express.Response) => {
    try {
        const { name, contact, email, message } = req.body
        const newMessage = await createMessages({ name, contact, email, message })
        return res.status(200).json({
            message: "Message sent",
            data: newMessage
        })
    } catch (error: any) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }

}
export const viewMessages = async (req: express.Request, res: express.Response) => {
    try {
        const allMessages = await getAllMessages();
        if (!allMessages || allMessages.length === 0) {
            return res.status(404).json({
                message: "messages were not found"
            })
        }
        return res.status(200).json({
            messages: "all messages found",
            data: allMessages,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const deleteMessage = async (req: express.Request, res: express.Response) => {
    try {
        const messageById = req.params.id;
        const existingMessage = await getMessageById(messageById);

        if (!existingMessage) {
            return res.status(404).json({
                messsage: "Message not found"
            });
        }
        const deletedMessage = await deleteMessageById(messageById);
        return res.status(200).json({
            message: "message deleted successfully",
            data: deletedMessage
        });

    }catch(error: any){
        return res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
}
