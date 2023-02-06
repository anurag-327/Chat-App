import React, { useState,useContext, useEffect } from 'react'
import {UserContext} from "../App"
import { ChatsCircle } from 'phosphor-react'
import { useNavigate,Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {X} from 'phosphor-react';
import {FileSearch} from 'phosphor-react';
import Loader from "react-js-loader";
import DrawerContact from './drawercontact';
import avatar from "../assets/avatar.png" 
import {UsersThree} from "phosphor-react"
import {ArrowLeft} from "phosphor-react"
import {Bell} from 'phosphor-react';
import NotificationDrawer from './notificationdrawer';
function ContactBoxHeader()
{
    const {user,setUser,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat,notification,setNotification}=useContext(UserContext);
    const navigate=useNavigate();
    const [drawer,setDrawer]=useState(false)
    const [searchUser,setsearchUser]=useState("")
    const [contacts,setContacts]=useState();
    const [loading,setLoading]=useState(false)
    const [profile,setProfile]=useState(false)
    const [openNotification,setOpenNotification]=useState(false)
    function handlelogout()
    {
        setUser("");
        setSelectedChat("");
        setChat([]);
        setUserChat([]);
        localStorage.removeItem("userinfo");
        navigate("/");   
    }
   
    return(
        <>
        <div  className='flex justify-between px-6 items-center h-[9.6%] bg-gray-200'> 
        <img onClick={() => setProfile(!profile)} className=' cursor-pointer w-10 h-10 bg-white rounded-full' src={avatar} alt="profile" />
        <div className='flex gap-4'>
        <UsersThree className='cursor-pointer' size={30} color="#868782" weight="fill" />
        <Bell onClick={()=> setOpenNotification(true) } className='cursor-pointer' size={30} color={(notification.length==0)?"#868782":"#FF0000"} weight="fill" />
        </div>
        </div>
       {
        profile&&
        
        <div className='absolute top-0 left-0 flex flex-col gap-4   h-[91vh] w-[90%]  md:w-[40%]  lg:w-[30%] xl:w-[30%] bg-gray-200  '>
            <div className='flex gap-3 justify-start  items-center h-32 bg-gray-900 p-3'>
                <ArrowLeft onClick={() => setProfile(!profile)} className="cursor-pointer" size={30} color="#FFFFFF" weight="duotone" />
                <span className='text-white text-center font-bold text-2xl'>Profile</span>
            </div>
            <div className='flex flex-col gap-3 '>
                <img className='w-[50%] m-auto rounded-full shadow-lg' src={avatar} alt="dp"/>
                <div className='flex flex-col gap-2 px-10 py-3 bg-gray-100'>
                    <h2 className='text-gray-400 '>Your Name</h2>
                    <span className=' text-gray-500 text-lg font-semibold'>{user.name}</span>
                </div>
                <div className='flex flex-col gap-2 px-10 py-3 bg-gray-100'>
                    <h2 className='text-gray-400 '>Email</h2>
                    <span className=' text-gray-500 text-lg font-semibold'>{user.email}</span>
                </div>
                <div className='flex flex-col gap-2 px-10 py-3 bg-gray-100'>
                <button onClick={handlelogout} className="font-bold rounded-md text-black p-2 bg-red-400 shadow-lg">Log Out</button>
                </div>
            </div>  
        </div>
       }
       {
        openNotification && <NotificationDrawer setOpenNotification={setOpenNotification} />
       }
       </>
       
    )
}
export default ContactBoxHeader