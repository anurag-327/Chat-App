const express=require('express');
const app=express();
var cors = require('cors')
const dotenv=require('dotenv').config();
const PORT=5000 || process.env.PORT;
const mongoose=require("./controller/mongoose")
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/chat",require("./routes/chat"));
app.use("/api/user",require("./routes/user"));
app.use("/api/message",require("./routes/message"));
app.use((req,res,next) =>
{
    res.status(404).json("Endpoint unreachable")
    next()
})
const server=app.listen(PORT,() =>
{
    console.log("server running on",PORT)
})

const io=require("socket.io")(server,{
    pingTimeout:60000,
    cors:
    {
        origin:"http://localhost:5173"
    }
});
io.on("connect",(socket) =>
{
  console.log("connected to socket.io")
  socket.on('setup',(user) =>
  {
    console.log(user._id)
    socket.join(user._id);
    socket.emit("connected")
  })
  socket.on('startchat',(chatId) =>
  {
    console.log("user joined room",chatId)
    socket.join(chatId);
    socket.emit("connected")
  })
  socket.on("sendmessage",(newmessage)=>
  {
      console.log(newmessage)
    var chatId= newmessage.chatId;
    if(!chatId.users) return console.log("users not defined")
    chatId.users.forEach(user => {
        if(user._id === newmessage.sender._id)  return 
        socket.in(user._id).emit("recievemessage",newmessage)  
    });
  })
})
