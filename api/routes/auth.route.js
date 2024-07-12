import express from 'express'
import { register , signin, signOut } from '../controlers/auth.controler.js'



const router = express.Router()

//Register

router.post('/register' , register)

//signIn

router.post('/signin' , signin)

//signout
router.get('/signout' ,signOut)



export default router