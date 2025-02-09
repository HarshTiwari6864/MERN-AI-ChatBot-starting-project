import { Avatar, Box, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useauth } from '../../context/Authcontext';

function extractcode(message:string){
  if(message.includes("```")){
    const blocks=message.split("```");
    return blocks;
  }
}
function iscodeblock(str:string){
  if(str.includes("=")||str.includes(";")||str.includes("[")||str.includes("]")||str.includes("{")||str.includes("}")||str.includes("#")||str.includes("//")){
    return true;
  }
  return false
}
const Chatitem = ({
    content,
    role,
  }: {
    content: string;
    role: "user" | "assistant";
  }) => {
    const messageblock=extractcode(content);
    const auth=useauth();
  return role==="assistant"||""?(<Box  sx={{
    display: "flex",
    py:2,
    bgcolor: "#004d5612",
    gap: 1,
    borderRadius: 2,
    my: 1,
  }}>
    <Avatar sx={{ ml: "0" ,bgcolor:"black",color:"white" }}>
    <img src="robot.png" alt="Mindy" width={"30px"} />
    
      </Avatar>
      <Box>
        {!messageblock && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )
}
{messageblock && messageblock.length &&
messageblock.map((block)=>iscodeblock(block)?<SyntaxHighlighter style={coldarkDark} >
{block}</SyntaxHighlighter>
:<Typography sx={{ fontSize: "20px" }}>{block}</Typography>)

}
</Box>
  </Box>):(<Box  sx={{
    display: "flex",
    p: 2,
    bgcolor: "#004d56",
    gap:1,
    borderRadius: 2,
  }}>
    <Avatar sx={{ ml: "0" ,color:"black",bgcolor:"white"}}>
    {auth?.user?.name[0]}{auth?.user?.name.split("")[1][0]}
      </Avatar>
      <Box>
        {!messageblock && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}

          {messageblock && messageblock.length &&
          messageblock.map((block)=>iscodeblock(block)?<SyntaxHighlighter style={coldarkDark}>
          {block}</SyntaxHighlighter>
          :<Typography sx={{ fontSize: "20px" }}>{block}</Typography>)

          }
          </Box>
            </Box>)
            
          }

export default Chatitem
