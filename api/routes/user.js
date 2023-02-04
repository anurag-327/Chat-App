const router=require('express').Router();
const User=require("../models/User")
const {VerifyToken}=require("./VerifyToken");
const {VerifyTokenAndAuthorization,VerifyTokenAndAdmin }=require("./VerifyToken");

router.get("/",VerifyToken,async(req,res) =>
{
    const search=req.query.search?{$or:[{name:{$regex:req.query.search,$options:"i"}},{email:{$regex:req.query.search,$options:"i"}}]} :{}
    const user=  await User.find(search).find({_id:{$ne:req.user.id}});
    res.status(200).json(user);
})


module.exports=router