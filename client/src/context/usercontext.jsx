import React from "react";
import { useState,useEffect,createContext,useContext } from "react";

export const Usercontext=createContext();
export default function Userprovider({children})
{
    const [user,setuser]=useState({});
    useEffect(() =>
    {
        useEffect(()=>
        {
            const userinfo=JSON.parse(localStorage.getItem("userinfo"));
            setuser(userinfo);
        },[])
    })
    return <Usercontext.Provider value={{user,setuser}}>{children}</Usercontext.Provider>
}
