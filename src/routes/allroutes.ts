import express from 'express';

import userRoute from './userRoutes';
import messageRoutes from './messageRoutes';
import blogRoutes from './blogRoutes';

const router = express.Router();

router.use("/users", userRoute);
router.use('/messages', messageRoutes)
router.use('/blogs', blogRoutes);

export default router