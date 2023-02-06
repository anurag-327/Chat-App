import React, { useState,useContext } from 'react'
import {UserContext} from "../App"
import { ChatsCircle } from 'phosphor-react'
import { useNavigate,Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {X} from 'phosphor-react';
import {FileSearch} from 'phosphor-react';
import {ArrowLeft} from 'phosphor-react';
import Loader from "react-js-loader";
import DrawerContact from './drawercontact';
import avatar from "../assets/avatar.png" 
function SearchUserBox()
{
    const {user,selectedChat,setSelectedChat,chat,setChat}=useContext(UserContext);
    const navigate=useNavigate();
    const [drawer,setDrawer]=useState(false)
    const [searchUser,setsearchUser]=useState("")
    const [contacts,setContacts]=useState();
    const [loading,setLoading]=useState(false)
    const [profile,setProfile]=useState(false)
    async function getuser()
    {
        const userinfo=JSON.parse(localStorage.getItem("userinfo"));
        setLoading(true);
        let options={
            headers:{
                "authorization":`Bearer ${userinfo.token}`
            }
        }
        const res= await fetch(`http://127.0.0.1:5000/api/user?search=${searchUser}`,options) ;
        const data= await res.json();
        if(res.status==200)
        {
            setContacts(data)
            setLoading(false)
        }
    }
    async function openchat(e)
    {
        const reciever=e.currentTarget.dataset.id;
        
        let options={
            method:"POST",
            headers:{
                "content-type":"application/json",
                "authorization":`Bearer ${user.token}`
            },
            body:JSON.stringify({chatId:reciever})
        }
        const res= await fetch(`http://127.0.0.1:5000/api/chat`,options) ;
        const data= await res.json();
        if(res.status==200)
        {
        //    console.log(data);
           if(!chat.find((c)=> c._id===data._id))
            setChat([data,...chat])
           
           setSelectedChat(data._id)
           setDrawer(false)
           setContacts("");
        }
        
    }
    function handlelogout()
    {
        localStorage.removeItem("userinfo");
        navigate("/");   
    }
    return(
    <div className='flex justify-between bg-white'>
        <div className='  flex flex-col gap-1 justify-center items-center w-full'>
        <button onClick={() => setDrawer(!drawer)} className=' text-start w-[80%]  bg-gray-200 text-black  h-9  px-2 rounded-md  ' >Search or start a new chat</button>
        <hr className="h-px w-[90%]  bg-gray-400 border-0 dark:bg-gray-700"/>
        </div>
        {
            drawer&&
            <div className='absolute top-0 left-0    h-[91vh] w-[90%]  md:w-[40%]  lg:w-[30%] xl:w-[30%] bg-white  '>
                <div className='flex gap-3 justify-start  items-center h-32 bg-gray-900 p-3'>
                <ArrowLeft onClick={() => setDrawer(!drawer)} className="cursor-pointer" size={30} color="#FFFFFF" weight="duotone" />
                <span className='text-white text-center font-bold text-2xl'>Search user</span>
                </div>
                <div className='w-[100%] gap-2 p-4 h-[2rem] flex justify-center '>
                    <input onChange={(e)=> setsearchUser(e.target.value)} className=' m-auto outline-none resize-none h-10  px-2 rounded-md w-[80%] bg-gray-200 placeholder:text-gray-500 ' type="text" placeholder='Search or start new chat'/>
                    <button onClick={getuser} className=' border border-black py-1 px-3 rounded-md h-10 bg-violet-600 text-white '>GO</button>
                </div>
                {
                    loading && <Loader type="spinner-default" bgColor={"#333"}  color={'#FFFFFF'} size={50} />
                }
                <div className='mt-10 overflow-auto no-scrollbar scrollbar-hide flex flex-col gap-2 p-2 '>
                    {
                   contacts&& contacts.map(item => <button onClick={(e)=>openchat(e)} key={item._id} data-id={item._id}><DrawerContact item={item} key={item._id} /></button> )
                    }
                </div>
            </div>
       }
       
       
       
    </div>
    )
}
export default SearchUserBox