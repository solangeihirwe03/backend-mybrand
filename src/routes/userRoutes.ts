import express from 'express';
import { authentication } from '../middleware/authentication';
import { login, signUp, viewUsers, deleteuser } from '../modules/user/controller/userController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users routes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       name: authorization
 *       in: header
 */

/**
 * @swagger
 * /users/signUp:
 *   post:
 *     summary: Signup a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             username: solange
 *             email: solange@gmail.com
 *             password: solange123
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *       404:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

router.post('/signUp', signUp);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: "ihirwe@gmail.com"
 *             password: "solange123"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', login)

/**
 * @swagger
 * /users/viewusers:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All users successfully found"
 *                 data:
 *                   type: object
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewusers',authentication, viewUsers)

/**
 * @swagger
 * /users/deleteuser/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedUser:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteuser/:id',authentication, deleteuser)

export default router;