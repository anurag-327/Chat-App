import React, {useContext,useEffect,useState} from "react";
import avatar from "../assets/avatar.png"
import avatargirl from "../assets/avatargirl.png"
import {UserContext} from "../App"
function SingleMessage({ item }) {
  const {user,selectedchat,setSelectedchat,chat,setChat} = useContext(UserContext);
  // console.log("came")
  // console.log(user._id,item)
  // for(let i of item)
  // {
  //     console.log(i)
  // }
//  console.log(typeof(item.createdAt))
  let inter=item.createdAt
  let hour=(parseInt(String(inter).slice(11,13))+5)%24;
  let min=(parseInt(String(inter).slice(14,16))+30);
 if(min>60)
 {
    min=min%60;
    hour=(hour+1)%24;
 }
 const time=String(inter).slice(11,16)?String(inter).slice(11,16):("00:00")
  const [loggeduser,setLoggeduser]=useState();
  
 
   useEffect(()=>
   {
    setLoggeduser(parseInt(localStorage.getItem("userinfo")))
   },[])
  return (
       

    <div className="w-full">
      {
         (user && item.sender._id ==user._id) ?(
        <div className="flex justify-end gap-5 ">
         
          <div className=" px-2 bg-violet-50  min-w-[25%] max-w-[40%] shadow-md flex flex-col   rounded-t-md rounded-bl-md  p-1">
            <p className=" break-words w text-black box-content whitespace-pre-wrap  text-ellipsis">{item.content}</p>
            {/* <span className="text-sm text-gray-500 text-end ">{hour}:{min}</span> */}
          </div>
          <div className="">
            <img
              className="w-8 h-8 m-auto rounded-full"
              src={avatar}
              alt="profile avatar"
            />
          </div>
        </div>
       ) : (
        <div className="flex justify-start gap-5  ">
          <div className="">
            <img
              className="w-8 h-8 m-auto rounded-full"
              src={avatargirl}
              alt="profile avatar"
            />
          </div>
          <div className="bg-green-200 px-2 flex flex-col whitespace-pre-wrap box-content min-w-[25%] max-w-[40%]  shadow-md  w-auto rounded-br-md rounded-t-md text-black ">
            <p className=" w-40 break-words text-black box-content whitespace-pre-wrap overflow-auto text-ellipsis">{item.content}</p>
            {/* <span className="text-sm text-gray-500 text-end ">{hour}:{min}</span> */}
          </div>
        </div> 
       )} 
    </div>
  )

}
export default SingleMessage;
