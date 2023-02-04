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
  
  const [user, setuser] = useState();
  const [selectedchat,setSelectedchat]=useState();
  const [chat,setChat]=useState([]); 
  useEffect(()=>
    {
        const userinfo=JSON.parse(localStorage.getItem("userinfo"));
        setuser(userinfo);
    },[])
  return (

    <UserContext.Provider value={{user,setuser,selectedchat,setSelectedchat,chat,setChat}}>
     
      
      <RouterProvider router={router} />
      
    </UserContext.Provider>
  )
}

export default App
