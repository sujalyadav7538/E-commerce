import { errorHandler } from "./error.js";
import  jwt  from 'jsonwebtoken';

export const verifyToken=(req,_,next)=>{
   const token = req.cookies.access_token;
   console.log(token)
   if (!token) return next(errorHandler(401,"UnauthorisedAccess"));
   jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if (err) return next(errorHandler(403,'Forbidden'));
    console.log(user)
    req.user=user;
    next();
   })
};