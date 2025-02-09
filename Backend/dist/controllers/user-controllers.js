import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createtoken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "errr", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(401).send("User already exist");
        }
        ;
        const hashpass = await hash(password, 10);
        const user = new User({ name, email, password: hashpass });
        await user.save();
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        const token = createtoken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "ok", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "errr", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("user does not exist");
        }
        const passiscorrect = await compare(password, (await user).password);
        if (!passiscorrect) {
            res.status(403).send("password is incorrect");
        }
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        const token = createtoken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "ok", email: user.email, name: user.name });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "errr", cause: error.message });
    }
};
export const verifyuser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if (!user) {
            return res.status(401).send("user not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtdata.id) {
            return res.status(401).send("permission didn't match");
        }
        return res.status(200).json({ message: "ok", email: user.email, name: user.name });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "errr", cause: error.message });
    }
};
export const userlogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if (!user) {
            return res.status(401).send("user not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtdata.id) {
            return res.status(401).send("permission didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        return res.status(200).json({ message: "ok", email: user.email, name: user.name });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "errr", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map