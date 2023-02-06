import React, { useState,useContext, useEffect } from 'react' 
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
 <ToastContainer
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
/> 
import notificationsound  from "../assets/notificationsound.mp3"
import Chatbox from '../components/chatbox';
import Contactbox from '../components/contactbox'
// import Chatbox from "../components/chatbox"
import Navbar from "../components/navbar"
import {UserContext} from "../App"
import { io } from 'socket.io-client'
const PORT="http://localhost:5000";
var socket;
var selectedChatCompare;
function Chat()
{
    const navigate=useNavigate();
    const [socketConnected,setSocketConnected]=useState(false)
    
    const {user,setuser,selectedChat,notification,setNotification,userChat,setUserChat} = useContext(UserContext);
    // useEffect(()=>
    // {
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
    // },[])
    
   function displaytoast()
   {
    toast.success('you recieved a notification', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
         });
   }
    useEffect(() =>
    {
        socket = io(PORT);
        socket.emit('setup',JSON.parse(localStorage.getItem("userinfo")));
    },[])

    useEffect(() => {
        
        // console.log("behra hai kya");
        socket.on("recievemessage", (messagerecieved) => {
            selectedChatCompare=selectedChat
          if (selectedChatCompare===undefined || selectedChatCompare !== messagerecieved.chatId._id)
          {
            // console.log("selected chat",selectedChat)
            
                 displaytoast();
                 function playSound() {
                
                    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
                    audio.autoplay="true";
                    audio.muted="true";
                    audio.play();
                    }
                    playSound();
            //    console.log("pakad mereko");
               setNotification([...notification,messagerecieved])
           } 
           if(selectedChatCompare === messagerecieved.chatId._id) {
            //    console.log("pakad liya")
               setUserChat([...userChat, messagerecieved]);
            // console.log(messagerecieved);
          }
        });
      });
  
    return(
    <>
        {/* <Navbar /> */}
       <div className='flex w-[95%] absolute top-10 left-0 right-0 shadow-inner  m-auto   gap-[0.10rem]  bg-white'>
       <Contactbox />
       {
          selectedChat!=undefined?( <Chatbox socket={socket} />):(<div className='flex-col text-center bg-gray-200 flex font-bold text-2xl h-[91vh] justify-evenly  xl:flex lg:flex md:flex xl:no-scrollbar  overflow-auto w-[60%] md:w-[60%] lg:w-[70%] xl:w-[70%] '> No chat selected <br></br> Select a chat to start chatting </div>)
       }
    </div>
    </>
    )
}
export default Chat