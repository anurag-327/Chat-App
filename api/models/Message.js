const mongoose=require('mongoose');
const messagemodel=new mongoose.Schema({
   content:{type:String,trim:true},
    chatId:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
    
},{
    timestamps:true
})
module.exports=mongoose.model("Message",messagemodel);