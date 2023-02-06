import React, { useEffect,useState,useContext } from 'react' 
import avatar from "../assets/avatar.png" 
import {UserContext} from "../App"
import Chatmessage from './singlemessage'
function ChatBoxHeader()
{
    const {user,selectedChat,setSelectedChat,chat,setChat} = useContext(UserContext);
    const [selecteduserinfo,setSelectedUserInfo]=useState("Dummy")
    useEffect(() =>
    {
        (async function(){
            let options={
                headers:{
                    "authorization":`Bearer ${user.token}`
                }
            }
            const res2= await fetch(`http://127.0.0.1:5000/api/chat/${selectedChat}`,options)
                const data2= await res2.json();
                if(res2.status==200)
                {
                   setSelectedUserInfo(data2) 
                }
        }())
        
    },[selectedChat])
    return(
    <>
    <div className='flex w-full h-[10%] justify-evenly items-center'>
               <div className='w-[100%] h-full flex items-center bg-gray-200 p-2 gap-4  '>
                  <div className="">
                      <img className="w-12 h-12 m-auto rounded-full" src={avatar} alt="profile avatar" />
                  </div>
                  <div className=" justify-start flex flex-col">
                     <span className=''>{selecteduserinfo.name}</span>
                     <span className=' text-sm text-gray-700'>Online</span>
                  </div>
                </div>    
            </div>
    </>
    )
}
export default ChatBoxHeader