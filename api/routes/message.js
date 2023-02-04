const router=require('express').Router();
const {VerifyToken}=require("./verifytoken")
const Chat=require("../models/Chat")
const User=require("../models/User");
const Message=require("../models/Message")
router.post("/sendmessage",VerifyToken,async(req,res)=>
{
    const {content,chatId}=req.body;
    if(content==""||!chatId)
    {
        return res.status(400).json("Cannot set message")
    }
    try{
        const newmessage= new Message({sender:req.user.id,content:content,chatId:chatId})
        const result= await newmessage.save();
        const fullchat= await Message.findOne({sender:req.user.id,content:content,chatId:chatId})
        .populate({path:"chatId",populate:{path:"users",select:"name email"}})
        .populate("sender","-password");
        return res.status(200).json(fullchat);
    }catch (err)
    {
        return res.sendStatus(500);
    }
})

router.get("/:chatId",VerifyToken,async (req,res)=>
{
    
    try{
        const fullchat= await Message.find({chatId:req.params.chatId})
        .populate("sender","-password")
        .populate("chatId")
        return res.status(200).json(fullchat);
    }catch(err)
    {
        console.log(err.message)
        return res.sendStatus(500);
    }
        
    

})
module.exports=router;