import jwt from"jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";

export const createtoken=(id:string,email:string,expiresIn:string)=>{
    const payload = {id,email};
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn,});
    return token;
}
export const verifytoken=async (req:Request,res:Response,next:NextFunction) => {
    const token=req.signedCookies[`${COOKIE_NAME}`];
    if(!token||token.trim==''){
        return res.status(401).json({message:'Token not recived'})
    }
    return new Promise<void>((resolve,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err){
                reject(err.message);
                return res.status(401).json({message:"Token exp"});
            }
            else{
             console.log("token verification successful");
             resolve();
             res.locals.jwtdata=success;
             return next();
            }
        });
    })
}