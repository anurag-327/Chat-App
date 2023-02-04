import React, { useState,useContext, useEffect } from 'react' 
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
{/* <ToastContainer
position="top-right"
autoClose={ 1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/> */}
import Contactbox from '../components/contactbox'
import Chatbox from "../components/chatbox"
import Navbar from "../components/navbar"
import {UserContext} from "../App"
function Chat()
{
    const navigate=useNavigate();
    const {user,setuser,selectedchat} = useContext(UserContext);
    if(!user)
    {
        toast.success('Login to chat', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
             });
        navigate("/")
        
    }
    useEffect(()=>{
        

    },[selectedchat])
    return(
    <>
        <Navbar />
       <div className='flex w-[95%]  m-auto   gap-[0.10rem]  bg-gray-300'>
       <Contactbox />
       {
          selectedchat!=undefined?( <Chatbox />):(<div className='flex-col text-center font-bold text-2xl h-[91vh] justify-evenly hidden xl:flex lg:flex md:flex xl:no-scrollbar  overflow-auto w-[60%] md:w-[60%] lg:w-[70%] xl:w-[70%] '> No chat selected <br></br> Select a chat to start chatting </div>)
       }
    </div>
    </>
    )
}
export default Chat