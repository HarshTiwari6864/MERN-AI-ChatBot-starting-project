import { NextFunction,Request,Response } from "express";
import {body, ValidationChain, validationResult} from "express-validator";



export const validate=(validations:ValidationChain[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        for (let validation of validations){
            const result=await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const error=validationResult(req);
        if(error.isEmpty()){
            return next();
        }
        res.status(422).json({error:error.array()})
    }
}

export const loginValidator=[
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({min:6}).notEmpty().withMessage("password is required of atleast 6 character"),

]

export const signupValidator=[
    body("name").notEmpty().withMessage("name is required"),
    ...loginValidator,

]
export const chatcompletionvalidator=[
    body("message").notEmpty().withMessage("name is required")

]