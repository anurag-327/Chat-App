import React, { useEffect,useState,useContext } from 'react' 
import { PaperPlaneTilt } from 'phosphor-react'
import {LinkSimple} from 'phosphor-react'
import {Smiley} from 'phosphor-react'
import {UserContext} from "../App"
import { io } from 'socket.io-client'
const PORT="http://localhost:5000";
var socket;
function ChatBoxFooter()
{
    const {user,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat} = useContext(UserContext);
    const [loggeduser,setloggeduser]=useState();
    const [newmessage,setNewmessage]=useState();
    const [selecteduserinfo,setSelectedUserInfo]=useState("Dummy")

    async function handlesendmessage(e)
    {
        if(e.key==='Enter' && newmessage)
        {
           
        let options={
            method:"POST",
            headers:{
                "content-type":"application/json",
                "authorization":`Bearer ${user.token}`
            },
            body:JSON.stringify({content:newmessage,chatId:selectedChat})
        }
        const res= await fetch("http://127.0.0.1:5000/api/message/sendmessage",options)
        const data= await res.json();
        if(res.status==200)
        {    
            socket=io(PORT);

            socket.emit('startchat',selectedChat);
            socket.emit('sendmessage',data)
            setUserChat([...userChat,data])   
            setNewmessage("");
        }
        
       }
    }
    return(
    <>
         <div className='flex w-full py-2 h-[10%] bg-gray-200 font-mono justify-evenly items-center'>
                <div className='w-[80%] flex justify-center items-center  p-1 gap-2  '>
                   <Smiley className='m-auto' size={40} color="#ffffff" weight="fill" />
                   <LinkSimple size={36} color="#0b0a0a" weight="fill" />
                   <input onKeyUp={handlesendmessage} onChange={(e)=> setNewmessage(e.target.value)} className=' bg-white outline-none text-lg resize-none p-2 w-full rounded-md' type="text" placeholder='Type a message' value={newmessage} />
                   {/* <input className=' bg-white outline-none text-lg resize-none p-2 w-full rounded-md' type="file" placeholder='Type a message' /> */}
                </div>
                <div className=' flex justify-center items-center bg-green-700 rounded-[50%] p-1 w-10 h-10'>
                    <PaperPlaneTilt size={44} color="#ffffff" weight="fill" />
                </div>
            </div>  
    </>
    )
}
export default ChatBoxFooter