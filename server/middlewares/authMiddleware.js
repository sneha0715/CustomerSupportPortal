import catchAsyncErrors from './catchAsyncErrors.js';
import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import ErrorHandler from './errorhandler.js';

const authMiddleware =catchAsyncErrors(async(req, res, next) => {
    const token=req.cookies.token || req.headers.authorization.split(' ')[1]
    if(!token){
        return next(new ErrorHandler("unauthorize access"),404)
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded._id)
        req.user=user
        next()
    }
    catch(error){
        return res.status(401).json({message:"unauthorize access"})
    }
    
})

export default authMiddleware;