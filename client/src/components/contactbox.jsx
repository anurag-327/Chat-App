import React,{useContext, useEffect, useState} from 'react'
import axios  from 'axios'
import avatar from "../assets/avatar.png"  
import {UserContext} from "../App"
import Chatcontact from './contact'
import Loader from "react-js-loader";
function Contactbox()
{
    const {user,selectedchat,setSelectedchat,chat,setChat} = useContext(UserContext);
    const [userinfo,setuserinfo]=useState()
    // const [contacts,setcontacts]=useState([])
    const [loading,setloding]=useState(true)

    function selectchat(e)
    {
        const reciever=e.currentTarget.dataset.id;
       setSelectedchat(e.currentTarget.dataset.id)
    }
    useEffect( () =>
    {
        user&& 
        (async function()
        {
            // console.log(user)
            // console.log("token")
            // console.log(user.token)
            let options={
                headers:{
                    "authorization":`Bearer ${user.token}`
                }
            }
            const res= await fetch("http://127.0.0.1:5000/api/chat",options) ;
            const data= await res.json();
            if(res.status==200)
            {
                // console.log(data);
                // setcontacts(data)
                setChat(data);
                setloding(false)
            }
            
            setloding(false)
        }())
         
    },[user])
    return(
    <div className='flex flex-col justify-center m-auto  h-[90vh] w-[90%]  md:w-[40%]  lg:w-[30%] xl:w-[30%]   '>
                <div  className='flex justify-center items-center h-[9.6%] bg-gray-200'>
                   <input className='  outline-none resize-none h-[60%] px-2 rounded-md w-[85%] placeholder:text-gray-700 ' type="text" placeholder='Search'/>
                </div>
                <div className='flex h-[90.4%] bg-white scrollbar-hide overflow-auto flex-col gap-2'>
                    {
                    //    loading?( <Loader type="spinner-default" bgColor={"#333"}  color={'#FFFFFF'} size={50} />):( chat.map(item => <button onClick={(e)=>selectchat(e)} key={item._id} data-id={item._id}><Chatcontact item={item} key={item._id} /></button> ))
                       chat.map(item => <button onClick={(e)=>selectchat(e)} key={item._id} data-id={item._id}><Chatcontact item={item} key={item._id} /></button> )
                    }    
                </div>
        </div>
    )
}
export default Contactbox