import { Box, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import Typinganime from '../components/typer/Typinganime'
import Footer from '../components/footer/Footer';


const Home = () => {
  const theme=useTheme();
  const isbelowmd=useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={'100%'} height={'100%'} >
      <Box sx={{
        display:"flex",
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        mx:'auto',
        mt:3
      }}
      style={{overflow: "hidden"}}
      >
        <Box>
          <Typinganime />
        </Box>
        <Box sx={{width:'100%',display:'flex',flexDirection:{md:"row",xs:"column",sm:'column'},
        gap:5,
        my:10,
      }}>
        <img 
        src='robot.png' 
        alt='robot' 
        style={{width:'200px',margin:'auto'}}/>
        <img 
        src='openai.png' 
        alt='robot' 
        className='image-inverted rotate'
        style={{width:'200px',margin:'auto'}}/>
      </Box>
      <Box sx={{display:'flex',width:'100%',mx:'auto'}}>
        <img src='chat.png' alt='chatbot' style={{display:'flex',
          margin:'auto',
          width:isbelowmd?"80%":"60%",
          borderRadius:20,
          boxShadow:"-5px -5px 105px #64f3d5",
          marginTop:20,
          marginBottom:20}}/>
      </Box>
      <Footer/>
      </Box>
    </Box>
  )
}

export default Home
