import React from 'react'




import Chatmessage from "./message"
import Contactbox from './contactbox'
import Chatbox from "./chatbox"
import {UserContext} from "../App"
import { useContext } from "react"
function Chatdisplay()
{
    const {user,setuser} = useContext(UserContext);
    console.log(user)
    return(
    <div className='flex w-[97%]  m-auto   gap-[0.10rem] mt-8 bg-gray-300'>
       <Contactbox />
        <Chatbox />
    </div>
    
    )
}
export default Chatdisplay