import React, {useContext,useEffect,useState} from "react";
import avatar from "../assets/avatar.png"
import avatargirl from "../assets/avatargirl.png"
import {UserContext} from "../App"
function Chatmessage({ item }) {
  const {user,selectedchat,setSelectedchat,chat,setChat} = useContext(UserContext);
  // console.log("came")
  // console.log(user._id,item)
  // for(let i of item)
  // {
  //     console.log(i)
  // }
 
  const [loggeduser,setLoggeduser]=useState();
  
 
   useEffect(()=>
   {
    setLoggeduser(parseInt(localStorage.getItem("userinfo")))
   },[])
  return (
        //    <div className="flex justify-end gap-5">
         
        //   <div className="bg-white shadow-md w-auto text-sm rounded-t-md rounded-bl-md text-black p-1">
        //      <span>{item.content}</span>
        //   </div>
        //    <div className="">
        //      <img
        //        className="w-8 h-8 m-auto rounded-full"
        //        src={avatar}
        //        alt="profile avatar"
        //      />
        //    </div> 
        //  </div>

    <div>
      {
         (user && item.sender._id ==user._id) ?(
        <div className="flex justify-end gap-5">
         
          <div className="bg-white shadow-md w-auto text-sm rounded-t-md rounded-bl-md text-black p-1">
            <span>{item.content}</span>
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
        <div className="flex justify-start gap-5">
          <div className="">
            <img
              className="w-8 h-8 m-auto rounded-full"
              src={avatargirl}
              alt="profile avatar"
            />
          </div>
          <div className="bg-white shadow-md text-sm w-auto rounded-tr-md rounded-b-md text-black p-1">
            <span>{item.content}</span>
          </div>
        </div> 
       )} 
    </div>
  )

}
export default Chatmessage;
