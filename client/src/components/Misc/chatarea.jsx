import React,{useState,useEffect,useContext} from 'react' 
import {UserContext} from "../App"
import SingleMessage from './singlemessage'
import { io } from 'socket.io-client'
const PORT="http://localhost:5000";
var socket;
function ChatArea()
{
    const {user,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat} = useContext(UserContext);
    var selectedChatCompare;
    useEffect(()=>
    {
        // socket=io(PORT);
        // socket.emit('startchat',selectedChat);
        console.log("behra hai kya")
        socket=io(PORT);
        socket.on('recievemessage',(messagerecieved) =>
        {
            console.log("pakad mereko")
            if(!selectedChatCompare || selectedChatCompare !==messagerecieved.chatId )
            {
                console.log("msg aaya hai")
            }
            else
            {
                setUserChat([...userChat,data])
                console.log(messagerecieved)
            }
        });
    })
    useEffect(()=>
    {
        (selectedChat!=undefined&&user)&&
        (async function(){
            selectedChatCompare=selectedChat
            let options={
                headers:{
                    "authorization":`Bearer ${user.token}`
                }
            }
            const res= await fetch(`http://127.0.0.1:5000/api/message/${selectedChat}`,options)
            const data= await res.json();
            if(res.status==200)
            {
                // console.log(data);
                setUserChat(data);
            }
            }())
    },[selectedChat,user])

 
    return(
    
    <div className=' h-[90%]   bg-green-100 xl:scrollbar-default md:scrollbar-default lg:scrollbar-default no-scrollbar overflow-auto flex flex-col gap-1 p-2 shadow-sm'>
              {
                  userChat.map(item => <SingleMessage item={item} key={item._id} />) 
              }
    </div>
    
    )
}
export default ChatArea