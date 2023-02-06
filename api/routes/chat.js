const router=require('express').Router();
const {VerifyToken}=require("./verifytoken")
const Chat=require("../models/Chat")
const User=require("../models/User");

router.post("/",VerifyToken,async (req,res) =>
{
    // console.log(req.body,req.user);
    const reciever=req.body.chatId;
    const sender=req.user.id;
    if(!reciever)
    {
        return res.status(400).json("Cannot Connect");
    }
    const chat= await Chat.find({isgroupchat:false,$and:[{users:{$elemMatch:{$eq:sender}}},{users:{$elemMatch:{$eq:reciever}}}]})
    .populate("users","-password")
    .populate({path:"latestmessage",populate:{path:"sender"}});
    // .populate({path:"latestmessage"});
    if(chat.length>0)
    {
        return res.status(200).json(chat[0])
    }
    else{
        const newchat= new Chat({chatname:"sender",isgroupchat:false,users:[sender,reciever]});
        const temp=await newchat.save();
        const fullchat= await Chat.findOne({_id:temp._id}).populate("users","-password")
        .populate({path:"latestmessage",populate:{path:"sender"}});
        return res.status(200).json(fullchat)   
    }
    // res.status(201).json(chat);
})
router.get("/",VerifyToken,async (req,res) =>
{
    const sender=req.user.id;
    const chat= await Chat.find({users:{$elemMatch:{$eq:sender}}})
    .populate("users")
    .populate({path:"latestmessage",populate:{path:"sender"}})
    .populate("groupadmin","-password")
    .sort({updatedAt:-1});
    if(chat)
    {
        return res.status(200).json(chat)
    }
    res.status(201).json("get all chats with id");
})
router.get("/:chatId",VerifyToken,async (req,res) =>
{
    const sender=req.user.id;
    const chat= await Chat.find({_id:req.params.chatId})
    .populate("users")
    
    // .select("users -id")
    let data;
    if(chat)
    { 
        chat.forEach((element) => {
            const user1=element.users[0];
            const user2=element.users[1];          
            if(user1._id!=req.user.id)
            {
                data=user1;
            }
            else
            {
                data=user2; 
            }
        });
        return res.status(200).json(data)
    }
    res.status(201).json("get all chats with id");
})
router.put("/updatelatestmessage",async (req,res) =>
{
    const result=await Chat.findByIdAndUpdate(req.body.chatId,{latestmessage:req.body.message},{new:true});
    // console.log(result)
  //  console.log("update latest messge")
})

router.post("/group",VerifyToken,async(req,res)=>
{
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
      }
      var users = JSON.parse(req.body.users);
      if (users.length < 2) {
        return res
          .status(400)
          .send("More than 2 users are required to form a group chat");
      }
      users.push(req.user);
      try {
        const groupchat = await Chat.create({
          chatname: req.body.name,
          users: users,
          isgroupchat: true,
          groupadmin: req.user,
        });
        const fullGroupChat = await Chat.findOne({ _id: groupchat._id })
        .populate("users", "-password")
        .populate("groupadmin", "-password");

        res.status(200).json(fullGroupChat);
     } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
    

})

router.put("/rename",VerifyToken,async(req,res) =>
{
    const { chatId, chatname } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatname: chatname,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupadmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
})

// router.put("/groupremove").put(protect, removeFromGroup);
// router.put("/groupadd").put(protect, addToGroup);
module.exports=router;