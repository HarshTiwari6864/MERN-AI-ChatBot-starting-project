import { Link } from "react-router-dom"

type props ={
    to:string,
    bg:string,
    text:string,
    textColor:string,
    onclick?:()=>Promise<void>
}

const Linked = (props:props) => {
  return (
    <Link onClick={props.onclick}
     className="nav-link" to={props.to} style={{background:props.bg,color:props.textColor}}>{props.text}</Link>
  )
}

export default Linked
