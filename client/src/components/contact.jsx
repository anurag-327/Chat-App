import React, { useEffect, useState } from 'react' 
import avatar from "../assets/avatar.png" 
function Chatcontact({item})
{
    
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
        <div className='flex flex-col hover:bg-gray-200'>
             <div className='flex gap-2 p-2'>
                  <div className='w-[20%]'>
                      <img className='w-12 h-12 m-auto rounded-full' src={avatar} alt="profile avatar"/>
                   </div>
                   <div className='w-[70%] flex flex-col'>
                        <div className='flex justify-between'>
                           <span>{name}</span>
                           <span>{item.lastmessagetime}</span>
                         </div>
                   <div className='w-full'>
                           <span className='text-sm text-gray-600 '>{item.lastmessage}</span>
                   </div>
                </div>
            </div>
            <div >
                <hr className='bg-gray-700 w-[80%] m-auto'></hr>
            </div>
        </div>
    )
}
export default Chatcontact