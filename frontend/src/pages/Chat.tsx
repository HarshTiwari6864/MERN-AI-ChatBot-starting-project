import {  Avatar, Box, Button, IconButton,  Typography } from '@mui/material'
import { useauth } from '../context/Authcontext'
import { red } from '@mui/material/colors';
import { IoMdSend } from 'react-icons/io';
import Chatitem from '../components/chat/Chatitem';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { deleteuserchat, getuserchat, sendChatRequest } from '../helpers/api-comss';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const navigate=useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth=useauth();
  const [chatmessage, setChatMessages] = useState<Message[]>([]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
  
      getuserchat()
        .then((data) => {
          console.log("API Response:", data); // Debugging line
  
          setChatMessages([...data]); // ✅ Now safe to spread
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatdata=await sendChatRequest(content);
    setChatMessages([...chatdata]);

  };
  const handledelete=async () => {
    try {
      toast.loading("Deleting chats",{id:"deletechats"})
      await deleteuserchat();
      setChatMessages([]);
      toast.success("Deleted chats sucessfully",{id:"deletechats"})
    } catch (error) {
      console.log(error)
      toast.error("Deleting chats failed",{id:"deletechats"})
    }
  }
  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login");
    }
  },[auth])
  
  return (
    <Box sx={{
      display:"flex",
      flex:1,
      width:'100%',
      height:"100%",
      mt:2,
      gap:3  ,
    }}>
      <Box sx={{display:{md:"flex",xs:"none",sm:"none"},
    flex: 0.2,
    flexDirection: "column",}}>
        <Box sx={{
          display:"flex",
          width:"100%",
          height:"85.5vh",
          bgcolor:"rgb(17,29,39)",
          flexDirection:"column",
          mx:2,
          borderRadius:5,

        }}><Box sx={{display:"flex",flexDirection:"row",mb:5,mt:3}}>
          <Box sx={{fontSize:"30px",mt:2,ml:11}}>Hi,</Box><Box sx={{pl:0.5,mt:2,fontSize:"30px"}}>{auth?.user?.name}</Box><Box><Avatar sx={{mt:2,bgcolor:"transparent",color:"white" }}>
    <img src="robot.png" alt="Mindy" width={"30px"} />
    </Avatar></Box>
          </Box>
          <Typography sx={{
            mx:5,
            fontFamily:"work sans",
            fontSize:"20px"
          }}>You are talking to mindy the chat bot</Typography>
          <Typography sx={{
            mx:2.5,
            fontFamily:"work sans",
            my:4,
            p:3,
            fontSize:"20px"
          }}>You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information</Typography>
            <Button
            onClick={handledelete}
            sx={{
              width: "200px",
              my: 2,
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: 5.5,
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
          <Box sx={{display:"flex",flexDirection:"row",mt:3,ml:12}}>
          <a href="https://www.linkedin.com/in/harshtiwari17" target="_blank" rel="noopener noreferrer">
  <img 
    src="linkd.png" 
    alt="LinkedIn" 
    width="30px" 
    height="30px" 
    className="image-inverted " 
  />
</a>
<a style={{marginLeft:"24px"}} href="https://github.com/HarshTiwari6864" target="_blank" rel="noopener noreferrer">
  <img 
    src="gitt.png" 
    alt="LinkedIn" 
    width="30px" 
    height="30px" 
    className="image-inverted" 
  />
</a>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px:2,
          width:"75%"
          
          
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "white",
            fontWeight: "600",
            mb: 0.5,
            mx: "auto",
            
          }}
        >
          How may i help you?
        </Typography>
        <Box
  sx={{
    width: '100%',
    height: "67vh",
    borderRadius: 3,
    mx: "auto",
    display: "flex",
    flexDirection: "column",
    overflow:"scroll",
    overflowY: "auto",
    overflowX: "hidden", // Ensure no horizontal scrolling
    scrollBehavior: "smooth",
  }}
>
  {chatmessage.map((chat, index) => (
    <Chatitem 
      content={chat.content} 
      role={chat.role} 
      key={index} 
    />
  ))}
</Box>

         <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} 
          sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div></Box>
    </Box>
  )
}

export default Chat
