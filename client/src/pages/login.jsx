import React, { useState,useContext, useEffect } from 'react' 
import { BugDroid } from 'phosphor-react';
import {WarningCircle} from 'phosphor-react';
import {BellRinging} from 'phosphor-react';
import FlashMessage from 'react-flash-message'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
<ToastContainer
position="top-right"
autoClose={ 1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
import {UserContext} from "../App"

function Login()
{
    const navigate=useNavigate();
    const {user,setUser} = useContext(UserContext);
    
    if(user)
    navigate("/chat")
    // useEffect(()=>
    // {
    //     if(user)
    //     navigate("/chat")
    // },[])
    const [login,setlogin]=useState(true);
    const [error,seterror]=useState(false);
    const [errormsg,seterrormsg]=useState("Good to go");
    const handlelogin=(e) =>
    { 
        const data=new FormData(e.target);
        let {name,password}=Object.fromEntries(data.entries());
        seterror(false);
            (async function (){
                const options={
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({name:name,password:password})
    
                }
                const res=await fetch("http://localhost:5000/api/auth/login",options);
                const data=await res.json();  
                if(res.status==201)
                {
                toast.success('🥂 logged in successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                 });
                    localStorage.setItem("userinfo",JSON.stringify(data))
                    // console.log(data)
                    seterrormsg("logged in successfully")
                    seterror(true);
                    navigate("/chat")
                }
                else{
                    toast.success('😔 Failed to login', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                         });
                    seterrormsg(data)         
                    seterror(true)
                }
              
            }()); 
        
    }
    const handlesignup=(e) =>
    { 
        const data=new FormData(e.target);
        let {name,email,password,confirmpassword}=Object.fromEntries(data.entries());
        if(confirmpassword!=password)
        {
            seterror(true);
            seterrormsg("Password doesnot match")
        }
        else
        {
            seterror(false);
            (async function (){
                const options={
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({name:name,password:password,email:email})
    
                }
                const res=await fetch("http://localhost:5000/api/auth/register",options);
                const data=await res.json();  
                if(res.status==201)
                {
                    toast.success('🥂 Successfully Registered', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                         });
                    console.log(data); 
                    localStorage.setItem("userinfo",JSON.stringify(data))
                    seterrormsg("Good to go") 
                    seterror(true)
                    navigate("/chat") 
                }
                else
                {
                    seterrormsg(data)   
                    seterror(true)
                }
                   
            }()); 
        }
        
    }
    return(
        <div className=" m-auto mt-36 w-[23%] font-mono border  min-w-[20rem] bg-gray-100 rounded-2xl ">
        <div className="m-auto shadow-md  rounded-2xl flex flex-col p-4  gap-6">
            <div className="text-center font-bold text-4xl ">
                {
                    login?( <h2 className="loginheader"> Login</h2>):(<h2 className=" signupheader">Sign Up</h2> )
                }                      
            </div>
            {
            login?(<form  onSubmit={(e)=> {e.preventDefault();
             handlelogin(e)}} method="post">
            <div className="flex flex-col gap-3 w-full mt-[2rem] loginsection"> 
                <div> 
                    <input type="text" required  className="username border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 outline-none" name="name" placeholder="Username"/>
                </div>
                <div>
                    <input type="password" required  className="passwordfield border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 hover:resize-none outline-none" name="password" placeholder="password"/>
                </div>
                <div className="checkboxfield">
                    <input type="checkbox" className="" />
                    <label className="">Remember Me</label>
                </div>
                <div className="text-center  rounded-lg text-white p-1">  
                    <button className="signupbutton w-full block  p-2 bg-blue-700 rounded-md">Login</button>
                </div>
                <div id="loginfooter" className=" text-center mt-4 ">
                    <span className="msg">Not a member? <button onClick={() => setlogin(false)}  className=" signupswitchlink gignupbutton text-blue-500 underline">Sign Up now</button></span>
                </div>
            </div>
            </form>):(  <form onSubmit={(e)=>{e.preventDefault(); handlesignup(e)}} method="post">
            <div className="flex flex-col gap-3 w-full signupsection  mt-[1rem] ">
                <div> 
                    <input type="text" required className="namefield  border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400  outline-none" name="name" placeholder="Name"/>
                </div>
                <div> 
                    <input type="text" required className="emailfield border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 outline-none" name="email" placeholder="Email Address"/>
                </div>
                <div>
                    <input type="password" required className="passwordfield border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 hover:resize-none outline-none" name="password" placeholder="password"/>
                </div>
                <div>
                    <input type="password" required className="confirmpasswordfield border-2 w-full  rounded-md p-1 border-gray-400 hover:border-orange-400 hover:resize-none outline-none" name="confirmpassword" placeholder="confirm password"/>
                </div>
                <div className="checkboxfield">
                    <input type="checkbox" className="" />
                    <label className="text-blue-500 cursor-pointer">I accept Terms and Conditions</label>
                </div>
                <div className="text-center  rounded-lg text-white mt-2 p-1">  
                        <button className="signupbutton w-full block  p-2 bg-blue-700 rounded-md">Sign Up</button>
                </div>
                <div id="loginfooter" className=" text-center mt-4 ">
                    <span className="msg">Already a member ? <button onClick={() => setlogin(true)}  className=" signupswitchlink gignupbutton text-blue-500 underline">Login</button></span>
                </div>
            </div>
            </form>)
            }
            
                { error &&
                    <div className='text-center flex gap-2  justify-center items-center text-bold text-red-700'>
                         {/* <WarningCircle size={32} color="#28C3B1" weight="fill" /> */}
                         <BellRinging size={32} color="#b3c653" weight="duotone" />
                         <span className='text-sm font-bold'>{errormsg}</span> 
                    </div>
                }   
            
                
        </div>
        <ToastContainer />
    </div>
    
    )
}
export default Login