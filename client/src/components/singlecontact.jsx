import React, { useEffect, useState ,useContext} from 'react' 
import { UserContext } from '../App';
import avatar from "../assets/avatar.png" 
function SingleContact({item})
{
    const {user,selectedChat,setSelectedChat,chat,setChat,userChat} = useContext(UserContext);
    const user1=item.users[0].email;
    const user2=item.users[1].email;
    
    let name,email;
    const loggeduser=JSON.parse(localStorage.getItem("userinfo"));
    if(loggeduser.email!=user1)
    {
         name=item.users[0].name;
         email=item.users[0].email;
        }
        else
        {
            name=item.users[1].name;
            email=item.users[1].email;
    }
    useEffect(() =>
    {
        // setLoggeduser(JSON.parse(localStorage.getItem("userinfo")));
    },[item])
    return(
        
        <div className={(selectedChat==item._id)?'flex flex-col border rounded-md  bg-gray-200 ':'flex flex-col border rounded-md hover:bg-gray-200'}>
             <div className='flex gap-2 p-1'>
                  <div className='w-[20%]'>
                      <img className='w-12 h-12 m-auto rounded-full' src={avatar} alt="profile avatar"/>
                   </div>
                   <div className='w-[70%] flex justify-start   flex-col'>
                        <div className='flex flex-col   justify-start text-start'>
                           <span className='font-semibold'>{name}</span>
                           <span className='font-extralight'> </span>
                         </div>
                   <div className='w-full text-start text-gray-600 overflow-hidden'>
                    {
                        item.latestmessage&&
                            <span className='text-sm text-gray-600 overflow-hidden'>{item.latestmessage.content}</span> 
                    }
                   </div>
                </div>
            </div>
           
        </div>
    )
}
export default SingleContact