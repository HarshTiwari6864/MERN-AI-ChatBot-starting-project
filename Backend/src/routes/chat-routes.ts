import { Router } from "express";
import { verifytoken } from "../utils/token-manager.js";
import { chatcompletionvalidator, validate } from "../utils/validators.js";
import { deletechats, generatechatcompletion, sendChatstouser } from "../controllers/chat-controller.js";
//protected api used only by verified user
const chatRouter=Router();
chatRouter.post("/new",validate(chatcompletionvalidator),verifytoken,generatechatcompletion)

chatRouter.get("/all-chats",
verifytoken,
sendChatstouser);

chatRouter.delete("/delete",
    verifytoken,
    deletechats);

export default chatRouter;