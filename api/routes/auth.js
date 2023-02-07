const router=require('express').Router();
const User= require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken")
router.post("/register",async (req,res) =>
 {
    // console.log(req.body)
    if(await User.findOne({email:req.body.email}))
    {
        return res.status(401).json("user already exists")
    }
    else
    {
        const newuser= new User({
            name:req.body.name,
            email:req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
            });
         try{
            const saveduser=await newuser.save();
            res.status(201).json(
                {
                    _id:saveduser._id,
                    name:saveduser.name,
                    email:saveduser.email,
                    token:tokengenerator(saveduser._id)
                })
            }catch(err) 
            {
                // console.log(err.message);
                res.status(500).json(err.message)
            }
    }    
 })

 router.post("/login", async(req,res) =>
 {
    try{
        const user=await User.findOne({name:req.body.name})
        if(!user)
        {
            return res.status(401).json("Wrong credentials");   
        }
        else
        {
            var originalpassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
            if(originalpassword!=req.body.password) 
            {
               return res.status(401).json("Wrong Password");
            }
            else
            {
               return res.status(201).json(
                    {
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        token:tokengenerator(user._id)
                    })
            }
        }
        
    }catch(err)
    {        
        res.status(500).json(err.message)
    }
 })

 const tokengenerator= (id) =>
 {
    return(jwt.sign({id},process.env.JWT_SEC,{expiresIn:"15d"}))

 }

module.exports =router;