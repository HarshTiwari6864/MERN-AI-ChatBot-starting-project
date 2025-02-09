import {createContext, ReactNode, useContext, useEffect, useState}from "react"
import { checkauthstatus, loginuser, logoutuser, signupuser } from "../helpers/api-comss";

type user={
    name:string;
    email:string;
};
type userAuth={
    isLoggedIn:boolean;
    user:user|null;
    login:(email:string,password:string)=>Promise<void>;
    signup:(name:string,email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;
}
const Authcontext=createContext<userAuth|null>(null);

export const Authprovider=({children}:{children:ReactNode})=>{
    const [user,setuser]=useState<user|null>(null);
    const [isLoggedIn,setisLoggedIn]=useState(false);
    useEffect(()=>{
        async function checkstatus() {
            const data = await checkauthstatus();
            if(data){
                setuser({email:data.email,name:data.name});
                setisLoggedIn(true);
            }
        } 
       checkstatus();
    },[])
    const login= async(email:string,password:string)=>{
        const data=await loginuser(email,password);
        if(data){
            setuser({email:data.email,name:data.name});
            setisLoggedIn(true);
        }
    };
    const signup=async(name:string,email:string,password:string)=>{
        const data=await signupuser(name,email,password);
        if(data){
            setuser({email:data.email,name:data.name});
            setisLoggedIn(true);
        }
    };
    const logout= async()=>{
        await logoutuser();
        setisLoggedIn(false)
        setuser(null)
        window.location.reload();
    }
    const value={
        user,
        isLoggedIn,
        signup,
        login,
        logout
    };
    return <Authcontext.Provider value={value}>
        {children}
    </Authcontext.Provider>
}
export const useauth=()=> useContext(Authcontext);
