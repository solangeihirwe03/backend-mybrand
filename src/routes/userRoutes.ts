import express from 'express';
import { authentication } from '../middleware/authentication';
import { login, signUp, viewUsers, deleteuser } from '../modules/user/controller/userController';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login)
router.get('/viewusers', viewUsers)
router.delete('/deleteuser/:id', deleteuser)

export default router;