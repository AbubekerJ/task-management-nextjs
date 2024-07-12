import { createError } from "./createError.js"
import jwt from 'jsonwebtoken'

 const verifyToken = (req, res ,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401 , 'Unautorized'))

    }
    jwt.verify(token , process.env.JWT_TOKEN , (err , user)=>{
        if(err){ return next(createError(401,'Forbidn'))}
        req.user=user
        next()
    } )

}

export default verifyToken