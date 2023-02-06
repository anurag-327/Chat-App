import React, { useContext, useEffect, useState,useRef } from "react";
import avatar from "../assets/avatar.png";
import { UserContext } from "../App";
import SingleMessage from "./singlemessage";
import { io } from "socket.io-client";

import { PaperPlaneTilt } from "phosphor-react";
import { LinkSimple } from "phosphor-react";
import { Smiley } from "phosphor-react";
const PORT = "http://localhost:5000";
// var socket;
function Chatbox({socket}) {
  const {user,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat,notification,setNotification} = useContext(UserContext);
  const [selecteduserinfo, setSelectedUserInfo] = useState("Dummy");
  const [loggeduser, setloggeduser] = useState();
  const [newmessage, setNewmessage] = useState("");
  var selectedChatCompare;
  const focusdiv=useRef(null)

  
  const userinfo=JSON.parse(localStorage.getItem("userinfo"))
  async function handlesendmessage(e) {
    if (e.key === "Enter" && newmessage) {
      let options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ content: newmessage, chatId: selectedChat }),
      };
      const res = await fetch(
        "http://127.0.0.1:5000/api/message/sendmessage",
        options
      );
      const data = await res.json();
      if (res.status == 200) 
      {
        socket.emit("sendmessage", data);
        setUserChat([...userChat, data]);
        setNewmessage("");
        let options2 = {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ message: data._id, chatId: selectedChat }),
        };
        const res = await fetch("http://127.0.0.1:5000/api/chat/updatelatestmessage",options2);
        const x= await res.json();
        
      }
    }
  }
  useEffect(() => {
    //connect socket as soon as we open chatbox or change selected chats
    
    socket.emit("startchat", selectedChat);
    selectedChat != undefined &&
      user &&
      (async function () {
        selectedChatCompare = selectedChat;
        let options = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };
        const res = await fetch(`http://127.0.0.1:5000/api/message/${selectedChat}`,options);
        const data = await res.json();
        if (res.status == 200) {
          // console.log(data);
          setUserChat(data);
        }
        const res2 = await fetch(`http://127.0.0.1:5000/api/chat/${selectedChat}`,options);
        const data2 = await res2.json();
        if (res2.status == 200) {
          setSelectedUserInfo(data2);
        }
      })();
  }, [selectedChat, user]);


 
  useEffect(() =>
  {
        focusdiv.current?.scrollIntoView();
  })
  return (
    <div className=" flex-col  h-[91vh] justify-evenly  xl:flex lg:flex md:flex xl:no-scrollbar  overflow-auto w-[90%]  md:w-[60%] lg:w-[70%] xl:w-[70%] ">
      <div className="flex w-full h-[10%] justify-evenly items-center">
        <div className="w-[100%] h-full flex items-center bg-gray-200 p-2 gap-4  ">
          <div className="">
            <img
              className="w-12 h-12 m-auto rounded-full"
              src={avatar}
              alt="profile avatar"
            />
          </div>
          <div className=" justify-start flex flex-col">
            <span className="">{selecteduserinfo.name}</span>
            {/* <span className=" text-sm text-gray-700">Online</span> */}
          </div>
        </div>
      </div>
      <div className=" h-[90%]   bg-green-100 xl:scrollbar-default md:scrollbar-default lg:scrollbar-default no-scrollbar overflow-auto flex flex-col gap-2 py-5 px-3 shadow-sm">
        {userChat.map((item) => (
          <SingleMessage item={item} key={item._id} />
        ))}
        <div ref={focusdiv} ></div>
      </div>
      <div className="flex w-full py-2 h-[10%] bg-gray-200 font-mono justify-evenly items-center">
        <div className="w-[80%] flex justify-center items-center  p-1 gap-2  ">
          <Smiley className="m-auto" size={40} color="#ffffff" weight="fill" />
          <LinkSimple size={36} color="#0b0a0a" weight="fill" />
          <input
            onKeyUp={handlesendmessage}
            onChange={(e) => setNewmessage(e.target.value)}
            className=" bg-white outline-none text-lg resize-none p-2 w-full rounded-md"
            type="text"
            placeholder="Type a message"
            spellCheck="false"
            value={newmessage}
          />
          {/* <input className=' bg-white outline-none text-lg resize-none p-2 w-full rounded-md' type="file" placeholder='Type a message' /> */}
        </div>
        
      </div>
    </div>
  );
}
export default Chatbox;
