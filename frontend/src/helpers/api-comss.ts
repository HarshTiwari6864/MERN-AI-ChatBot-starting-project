import axios from "axios"


export const loginuser=async(
    email:string,
    password:string
)=>{
    const res=await axios.post("/user/login",{email,password});
    if(res.status!==200){
        throw new Error("unable to connect");
    }
    const data=await res.data;
    return data;
}

export const signupuser=async(
    name:string,
    email:string,
    password:string
)=>{
    const res=await axios.post("/user/signup",{name,email,password});
    if(res.status!==201){
        throw new Error("unable to signup");
    }
    const data=await res.data;
    return data;
}

export const checkauthstatus=async()=>{
    const res=await axios.get("/user/auth-status");
    if(res.status!==200){
        throw new Error("unable to authenticate");
    }
    const data=await res.data;
    return data;
}
export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", { message });

    if (res.status !== 200) {
        throw new Error("Unable to send chat");
    }
    console.log("Message being sent:", message);
    // Extract 'chats' array
    return res.data.chats; // ✅ Fix: Ensure correct response structure
};

export const getuserchat = async () => {
    const res = await axios.get("/chat/all-chats",);

    if (res.status !== 200) {
        throw new Error("Unable to send chat");
    }
    console.log("Message being sent:");
    // Extract 'chats' array
    const data= await res.data.chats;
    return data; // ✅ Fix: Ensure correct response structure
};

export const deleteuserchat = async () => {
    const res = await axios.delete("/chat/delete");

    if (res.status !== 200) {
        throw new Error("Unable to delete chat");
    }
    console.log("Message being sent:");
    // Extract 'chats' array
    return res.data.chats; // ✅ Fix: Ensure correct response structure
};

export const logoutuser = async () => {
    const res = await axios.get("/user/logout");

    if (res.status !== 200) {
        throw new Error("Unable to delete chat");
    }
    console.log("Message being sent:");
    // Extract 'chats' array
    return res.data.chats; // ✅ Fix: Ensure correct response structure
};






