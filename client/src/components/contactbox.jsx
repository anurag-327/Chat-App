import React,{useContext, useEffect, useState} from 'react'
import axios  from 'axios'
import avatar from "../assets/avatar.png"  
import {UserContext} from "../App"
import SingleContact from './singlecontact'
import Loader from "react-js-loader";
import SearchUserBox from './searchuserbox'
import ContactBoxHeader from './contactboxheader'
function Contactbox()
{
    const {user,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat} = useContext(UserContext);
    const [userinfo,setuserinfo]=useState()
    // const [contacts,setcontacts]=useState([])
    const [loading,setloding]=useState(true)
    async function selectchat(e)
    {
        
        const reciever=e.currentTarget.dataset.id;
        setSelectedChat(e.currentTarget.dataset.id)
        
    }
    // useEffect( () =>
    // {
    //     user&& 
    //     (async function()
    //     {
    //         // console.log(user)
    //         // console.log("token")
    //         // console.log(user.token)
    //         let options={
    //             headers:{
    //                 "authorization":`Bearer ${user.token}`
    //             }
    //         }
    //         const res= await fetch("http://127.0.0.1:5000/api/chat",options) ;
    //         const data= await res.json();
    //         if(res.status==200)
    //         {
    //             // console.log(data);
    //             // setcontacts(data)
    //             setChat(data);
    //             setloding(false)
    //         }
            
    //         setloding(false)
    //     }())
         
    // },[user,userChat])
    return(
    <div className='md:flex lg:flex xl:flex flex-col hidden gap-2 justify-center m-auto bg-w  h-[90vh] w-[90%]  md:w-[40%]  lg:w-[30%] xl:w-[30%]   '>
                <ContactBoxHeader />
                <SearchUserBox />
                <div className='flex h-[90.4%] bg-white scrollbar-hide overflow-auto flex-col p-2 gap-1 '>
                    {
                    //    loading?( <Loader type="spinner-default" bgColor={"#333"}  color={'#FFFFFF'} size={50} />):( chat.map(item => <button onClick={(e)=>selectchat(e)} key={item._id} data-id={item._id}><SingleContact item={item} key={item._id} /></button> ))
                       chat.map(item => <button onClick={(e)=>selectchat(e)} key={item._id} data-id={item._id}><SingleContact item={item} key={item._id} /></button> )
                    }    
                </div>
        </div>
    )
}
export default Contactbox