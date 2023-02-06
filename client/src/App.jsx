import { useContext, useState,createContext,useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Login from "./pages/login"
import Chat from './pages/chat'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const router=createBrowserRouter([
  {
    path:"/chat",
    element:<Chat />
  },
  {
    path:"/",
    element:<Login />
  }
])

import Navbar from './components/navbar';
export const UserContext = createContext();

function App() 
{
  
  const [user, setUser] = useState();
  const [selectedChat,setSelectedChat]=useState();
  const [chat,setChat]=useState([]); 
  const [userChat,setUserChat]=useState([]); 
  const [notification,setNotification]=useState([]);
  
  useEffect(()=>
    {
        const userinfo=JSON.parse(localStorage.getItem("userinfo"));
        setUser(userinfo);
    },[])


    useEffect( () =>
    {
        user&& 
        (async function()
        {
            // console.log(user)
            // console.log("token")
            // console.log(user.token)
            let options={
                headers:{
                    "authorization":`Bearer ${user.token}`
                }
            }
            const res= await fetch("http://127.0.0.1:5000/api/chat",options) ;
            const data= await res.json();
            if(res.status==200)
            {
                // console.log(data);
                // setcontacts(data)
                setChat(data);
                // setloding(false)
            }
            
            // setloding(false)
        }())
         
    },[user,userChat])

  return (

    <UserContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chat,setChat,userChat,setUserChat,notification,setNotification}}>
     

      <RouterProvider router={router} />
      
    </UserContext.Provider>
  )
}

export default App
