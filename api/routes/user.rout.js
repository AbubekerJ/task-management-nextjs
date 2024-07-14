import express from 'express'
import { user } from '../controlers/user.controler.js'

const router = express.Router()


/**
 * @swagger
 *  /api/getalluser:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users with their id and username.
 *     tags:
 *       - GetAllUsers
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Unable to connect to the server. Please check your network connection and try again.
 */

router.get('/getalluser' , user)


export default router