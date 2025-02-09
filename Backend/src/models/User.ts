import { randomUUID } from "crypto";
import mongoose from "mongoose";
const chatsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID, // Correctly sets a default value
    },
    role: {
        type: String,
        required: true, // Ensures this field is mandatory
    },
    content: {
        type: String,
        required: true, // Ensures this field is mandatory
    },
});

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensures this field is mandatory
    },
    email: {
        type: String, // Fixed the typo from `Type` to `type`
        required: true, // Ensures this field is mandatory
        unique: true, // Ensures email is unique
    },
    password: {
        type: String,
        required: true, // Ensures this field is mandatory
    },
    chats: { type: [chatsSchema], default: [] }, // Embeds the chatsSchema as an array
});

export default mongoose.model("user", userSchema);