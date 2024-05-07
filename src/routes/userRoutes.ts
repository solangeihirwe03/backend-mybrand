import express from 'express';
import { authentication } from '../middleware/authentication';
import { login, signUp, viewUsers, deleteuser } from '../modules/user/controller/userController';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login)
router.get('/viewusers',authentication, viewUsers)
router.delete('/deleteuser/:id',authentication, deleteuser)

export default router;