import User from "../models/User.js";
import { configureGemini } from "../config/gem.js";
export const generatechatcompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }
        // Get previous user chats
        const chats = user.chats.map(({ role, content }) => ({ role, parts: [{ text: content }] }));
        chats.push({ role: "user", parts: [{ text: message }] });
        user.chats.push({ content: message, role: "user" });
        // Initialize Gemini with "gemini-1.5-flash"
        const genAI = configureGemini();
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Generate response
        const chatResponse = await model.generateContent({ contents: chats });
        const geminiReply = chatResponse.response.candidates[0].content.parts[0].text;
        user.chats.push({ content: geminiReply, role: "assistant" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
export const sendChatstouser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }
        if (user._id.toString() !== res.locals.jwtdata.id) {
            return res.status(401).json({ message: "Permission didn't match" });
        }
        return res.status(200).json({
            message: "ok",
            chats: Array.isArray(user.chats) ? user.chats : [],
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "errr", cause: error.message });
    }
};
export const deletechats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if (!user) {
            return res.status(401).send("user not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtdata.id) {
            return res.status(401).send("permission didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "ok" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "errr", cause: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map