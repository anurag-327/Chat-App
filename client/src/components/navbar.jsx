import React, { useState,useContext } from 'react'
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
function Navbar()
{
    const {user,selectedchat,setSelectedchat,chat,setChat}=useContext(UserContext);
    const navigate=useNavigate();
    const [drawer,setDrawer]=useState(false)
    const [searchUser,setsearchUser]=useState("")
    const [contacts,setContacts]=useState();
    const [loading,setLoading]=useState(false)
    const [profile,setProfile]=useState(false)
    async function getuser()
    {
        setLoading(true);
        let options={
            headers:{
                "authorization":`Bearer ${user.token}`
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
           
           setSelectedchat(data._id)
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
    <nav className='flex justify-between relative  bg-green-600 p-3'>
        <div className='w-[40%] h-[2rem] flex justify-center '>
        {/* <FileSearch  size={30} color="#414337" weight="duotone" /> */}
        <button onClick={() => setDrawer(!drawer)} className='  bg-gray-100 text-black m-auto outline-none resize-none h-9  px-2 rounded-md  border-2 border-black ' >Search User</button>
        </div>
        <div className='flex gap-2 m-auto justify-center'>
            <ChatsCircle size={32} weight="thin" />
            <span className='mt-1 text-lg font-bold text-white'>CHAT APP</span>
        </div>
        <div className='w-[40%] flex justify-end relative right-10 gap-8 font-bold'>
             <img onClick={() => setProfile(!profile)} className=' cursor-pointer w-10 h-10 bg-white rounded-full' src={avatar} alt="profile" />
             <button onClick={handlelogout} className="font-bold rounded-md text-black p-2 bg-red-400 shadow-lg">Log Out</button>
        </div>
        {
            drawer&&
            <div className='absolute top-0 left-0   h-[100vh] bg-white py-2 px-6'>
                <div className='flex justify-end'>
                <X onClick={() => setDrawer(!drawer)} className="cursor-pointer" size={36} color="#414337" weight="duotone" />
                </div>
                <div className='w-[100%] gap-2 p-4 h-[2rem] flex justify-center '>
                    <input onChange={(e)=> setsearchUser(e.target.value)} className='border border-black m-auto outline-none resize-none h-8  px-2 rounded-md w-[80%] bg-gray-100 placeholder:text-gray-500 ' type="text" placeholder='Search user by name/email'/>
                    <button onClick={getuser} className=' border border-black py-1 px-3 rounded-md h-8 bg-violet-600 text-white '>GO</button>
                </div>
                {
                    loading && <Loader type="spinner-default" bgColor={"#333"}  color={'#FFFFFF'} size={50} />
                }
                <div className='mt-10 flex flex-col gap-2 '>
                    {
                   contacts&& contacts.map(item => <button onClick={(e)=>openchat(e)} key={item._id} data-id={item._id}><DrawerContact item={item} key={item._id} /></button> )
                    }
    
                </div>
            </div>
       }
       {
        profile&&
        <div className='absolute top-16 flex flex-col gap-3  text-white  justify-center p-3 right-5 h-auto w-[15rem] lg:w-[20rem] xl:w-[15rem] bg-gray-400 shadow-md'>
            <img className='w-[50%] m-auto rounded-full shadow-lg' src={avatar} alt="dp"/>
            <h2 className='text-center font-bold'>{user.name}</h2>
            <h2 className='text-center '>{user.email}</h2>


        </div>
       }
       
       
    </nav>
    )
}
export default Navbar