import React, { useEffect, useState } from 'react' 
import avatar from "../assets/avatar.png" 
function DrawerContact({item})
{
    return(
        <div className='flex flex-col  hover:bg-gray-200'>
             <div className='flex gap-2 p-2 border border-black rounded-md shadow-md'>
                  <div className='w-[20%]'>
                      <img className='w-12 h-12 m-auto rounded-full' src={avatar} alt="profile avatar"/>
                   </div>
                   <div className='w-[70%] flex flex-col'>
                        <div className='flex flex-col text-start justify-start'>
                           <span className='font-semibold'>{item.name}</span>
                           <span className='text-sm '>{item.email}</span>
                         </div>
                   
                </div>
            </div>
            
        </div>
    )
}
export default DrawerContact