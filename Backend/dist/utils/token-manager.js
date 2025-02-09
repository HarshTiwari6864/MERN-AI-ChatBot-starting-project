import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createtoken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn, });
    return token;
};
export const verifytoken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim == '') {
        return res.status(401).json({ message: 'Token not recived' });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token exp" });
            }
            else {
                console.log("token verification successful");
                resolve();
                res.locals.jwtdata = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map