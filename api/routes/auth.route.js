import express from 'express'
import { register , signin, signOut } from '../controlers/auth.controler.js'



const router = express.Router()

//Register

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
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
 *                 format: password
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - missing or invalid fields
 *       409:
 *         description: Conflict - username or email already exists
 *       500:
 *         description: Internal Server Error
 */



router.post('/register' , register)

//signIn

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Sign in to the application
 *     tags: [Authentication]
 *     requestBody:
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
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request - missing or invalid fields
 *       401:
 *         description: Unauthorized - invalid email or password
 *       500:
 *         description: Internal Server Error
 */

router.post('/signin' , signin)

//signout

/**
 * @swagger
 * /api/signout:
 *   get:
 *     summary: Sign out from the application
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Sign out successful
 *       500:
 *         description: Internal Server Error
 */

router.get('/signout' ,signOut)



export default router