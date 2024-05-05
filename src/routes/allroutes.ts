import express from 'express';

import userRoute from './userRoutes';
import messageRoutes from './messageRoutes';

const router = express.Router();

router.use("/users", userRoute);
router.use('messages', messageRoutes)

export default router