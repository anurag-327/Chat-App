import React,{useContext, useEffect, useState} from 'react' 
import avatar from "../assets/avatar.png" 
import {UserContext} from "../App"
import Chatmessage from './message'
import { PaperPlaneTilt } from 'phosphor-react'
import {LinkSimple} from 'phosphor-react'
import {Smiley} from 'phosphor-react'
function Chatbox()
{
    const {user,selectedchat,setSelectedchat,chat,setChat} = useContext(UserContext);
    const [loggeduser,setloggeduser]=useState();
    const [newmessage,setNewmessage]=useState();
    const [userchat,setUserchat]=useState([]);
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
            body:JSON.stringify({content:newmessage,chatId:selectedchat})
        }
        const res= await fetch("http://127.0.0.1:5000/api/message/sendmessage",options)
        const data= await res.json();
        if(res.status==200){
            // console.log(data);
            // console.log(userchat)
            setUserchat([...userchat,data])
            // console.log(userchat)
            setNewmessage("");
        }
        
       }
    }
    useEffect(()=>
    {
        
        (selectedchat!=undefined&&user)&&
        (async function(){
            // console.log(selectedchat)
            let options={
                headers:{
                    "authorization":`Bearer ${user.token}`
                }
            }
            const res= await fetch(`http://127.0.0.1:5000/api/message/${selectedchat}`,options)
            const data= await res.json();
            if(res.status==200)
            {
                // console.log(data);
                setUserchat(data);
            }
            const res2= await fetch(`http://127.0.0.1:5000/api/chat/${selectedchat}`,options)
            const data2= await res2.json();
            if(res2.status==200)
            {
               setSelectedUserInfo(data2) 
            }

            }())
    },[user,selectedchat])
    return(
        
        <div className=' flex-col  h-[91vh] justify-evenly hidden xl:flex lg:flex md:flex xl:no-scrollbar  overflow-auto w-[60%] md:w-[60%] lg:w-[70%] xl:w-[70%] '>
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
            <div className=' h-[90%]   bg-green-100 xl:scrollbar-default md:scrollbar-default lg:scrollbar-default no-scrollbar overflow-auto flex flex-col gap-1 p-2 shadow-sm'>
              {
                  userchat.map(item => <Chatmessage item={item} key={item._id} />) 
              }
            </div>
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
        </div>
    )
}
export default Chatbox