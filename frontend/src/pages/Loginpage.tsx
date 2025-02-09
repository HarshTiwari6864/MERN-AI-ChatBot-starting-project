import { Box, Button, Typography } from '@mui/material'
import { AiOutlineLogin } from "react-icons/ai";
import Custominput from '../components/shared/Custominput.tsx'
import { useauth } from '../context/Authcontext.tsx';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Loginpage = () => {
  const navigate=useNavigate();
  const auth=useauth();
  const handle=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formdata=new FormData(e.currentTarget);
    const email=formdata.get("email") as string;
    const password=formdata.get("password") as string;
    try {
      toast.loading("Signing In!",{id:"login"})
      await auth?.login(email,password);
      toast.success("Signed In Successfully!",{id:"login"})
    } catch (error) {
      console.log(error)
      toast.error("Signing In Failed!",{id:"login"})
    }
  }
  useEffect(()=>{
    if(auth?.user){
      return navigate("/chat");
    }
  },[auth])
  return (
    
    <Box width={'100%'} height={'100%'} display='flex' flex={1}>
      <Box display={'flex'} flex={{xs:1,mid:0.5}} justifyContent={"center"}
      alignItems={"center"} padding={2} ml={"auto"} mt={16} >
        <form className='disp'
        onSubmit={(handle)}
        >  <Box sx={{display:"flex",
          flexDirection:"column",
          justifyContent:"center"
        }}>
          
          <Typography variant='h4' textAlign={"center"} padding={2} fontWeight={600}>
            Login</Typography>
            <Custominput type='email ' label='Email' name='email'/>
            <Custominput type='password' label='Password' name='password'/>
            <Button type='submit' sx={{px:2,py:1,mt:2, width:"400px",borderRadius:2, bgcolor:"#00fffc",":hover":{bgcolor:"white",color:"black"}}}
            endIcon={<AiOutlineLogin/>}>Login</Button>
        </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Loginpage
