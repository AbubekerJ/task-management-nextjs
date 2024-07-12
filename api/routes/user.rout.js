import express from 'express'
import { user } from '../controlers/user.controler.js'

const router = express.Router()


router.get('/getalluser' , user)


export default router