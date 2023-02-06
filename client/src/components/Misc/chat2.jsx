import React,{useContext, useEffect, useState} from 'react' 
import avatar from "../assets/avatar.png" 
import {UserContext} from "../App"
import SingleMessage from './singlemessage'
import { io } from 'socket.io-client'
import ChatBoxHeader from './chatboxheader'
import ChatBoxFooter from './chatboxfooter'
import ChatArea from './chatarea'
const PORT="http://localhost:5000";
var socket;
function Chatbox()
{
    const {user,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat} = useContext(UserContext);
    const [loggeduser,setloggeduser]=useState();
    useEffect(()=>
    {
        //connect socket as soon as we open chatbox or change selected chats
        socket=io(PORT);
        socket.emit('startchat',selectedChat);

    },[selectedChat])
    return(
        
        <div className=' flex-col  h-[91vh] justify-evenly hidden xl:flex lg:flex md:flex xl:no-scrollbar  overflow-auto w-[60%] md:w-[60%] lg:w-[70%] xl:w-[70%] '> 
            <ChatBoxHeader />
            <ChatArea />
            <ChatBoxFooter/>    
        </div>
    )
}
export default Chatbox