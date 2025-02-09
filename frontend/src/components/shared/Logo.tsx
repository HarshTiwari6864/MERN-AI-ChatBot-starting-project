import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <div style={{
        display:'flex',marginRight:"auto",alignItems:'center',gap:"15px",marginTop:"5px"
    }}>
        <Link to={"/"} >
        <img src="robott.png" alt="mindy" width={"60px"}
        height={'60px'} />
        </Link>
        <Typography sx={{display:{md:"block",sm:"none",xs:"none"},
        mr:"auto",
        fontWeight:"800",
        textShadow:"2px 2px 20px #000"}}>
            <span style={{fontSize:"30px"}}>MINDY</span>- Chatbot
        </Typography>
      
    </div>
  )
}

export default Logo
