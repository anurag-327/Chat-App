import React,{useContext} from 'react' 
import { UserContext } from '../App';
import {X} from "phosphor-react"
function Notification({item,setOpenNotification})
{
    const {user,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat,notification,setNotification} = useContext(UserContext);
    function removenotification(e)
    {
        const notificationcopy=notification;
        // console.log(item.chatId)
        setSelectedChat(item.chatId._id)
        // console.log(notification)
        setNotification(notification.filter(c => c!== item))  
        setOpenNotification(false)
    }
   
    return(
    <>
    <div className='flex justify-between gap-1 px-2 py-2  bg-gray-100'>
        {/* <h2 className='text-black '>Notification from {item.sender.name}</h2> */}
        <button  data-id={item._id} onClick={(e) => removenotification(e)}> <h2 className='text-black '>Notification from {item.sender.name}</h2></button>
    </div>
    </>
    )
}
export default Notification