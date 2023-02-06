import React,{useState,useEffect,useContext} from 'react' 
import { UserContext } from '../App';
import { ArrowLeft } from 'phosphor-react'
import Notification from './notification';
function NotificationDrawer({setOpenNotification})
{
    const {user,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat,notification,setNotification} = useContext(UserContext);
    // useEffect(()=>
    // {

    // },[notification])
    
    return(
    <>
       <div className='absolute top-0 left-0 flex flex-col gap-4   h-[91vh] w-[90%]  md:w-[40%]  lg:w-[30%] xl:w-[30%] bg-gray-200  '>
            <div className='flex gap-3 justify-start  items-center h-32 bg-gray-900 p-3'>
                <ArrowLeft onClick={() => setOpenNotification(false)} className="cursor-pointer" size={30} color="#FFFFFF" weight="duotone" />
                <span className='text-white text-center font-bold text-2xl'>Notifications</span>
            </div>
            <div className='flex flex-col gap-3 overflow-auto no-scrollbar px-2 '>
                {
                    !notification==[]?(notification.map(item => <Notification key={item._id} item={item} setOpenNotification={setOpenNotification} />)):(<div className='text-black m-auto'> No Notifications yet</div>)
                }
            </div>  
        </div>
    </>
    )
}
export default NotificationDrawer