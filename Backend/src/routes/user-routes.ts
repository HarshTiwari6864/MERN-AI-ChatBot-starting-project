import { Router } from "express";
import { getAllUsers, userLogin, userlogout, userSignup, verifyuser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifytoken } from "../utils/token-manager.js";

const userRouter=Router();

userRouter.get("/",getAllUsers);

userRouter.post("/signup",validate(signupValidator),userSignup);

userRouter.post("/login",validate(loginValidator),userLogin);
userRouter.get("/auth-status",verifytoken,verifyuser);
userRouter.get("/logout",verifytoken,userlogout);
export default userRouter;