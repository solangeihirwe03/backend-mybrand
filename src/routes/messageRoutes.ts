import express from 'express';
import { authentication } from '../middleware/authentication';
import { createMessage, viewMessages, deleteMessage } from '../modules/message/controller/messageController';

const router = express.Router();

router.post("/createMessage", createMessage);
router.get("/viewMessage", authentication,  viewMessages);
router.delete("/deleteMessage/:id", authentication,  deleteMessage)

export default router;