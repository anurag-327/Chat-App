const jwt =require("jsonwebtoken");
const User=require("../models/User")

const VerifyToken =async (req,res,next) =>
{

    const authHeader= req.headers.authorization;
    
    let token;
    if(authHeader && authHeader.startsWith("Bearer"))
    { 
        try{
            token=authHeader.split(' ')[1]; 
            jwt.verify(token, process.env.JWT_SEC,async (err,user) =>
            {
            if(err) return res.status(403).json("Invalid Token");
            req.user=await User.findById(user.id).select("-password");
            next()
           })
        }catch(err)
        {
            console.log("in catch")
            res.status(401).json("Not Authorised Token failed");
        }
      
    }
    else{
        return res.status(401).json("No token");
    }
}

const VerifyTokenAndAuthorization= (req,res,next) =>
{
    VerifyToken(req,res,() =>
    {
        if(req.user.id===req.params.id)
        {
            next();
        }
        else
        {
            res.status(401).status("You are not allowed to do that !");
        }
    })
}
const VerifyTokenAndAdmin= (req,res,next) =>
{
    VerifyToken(req,res,() =>
    {
        if(req.user.isAdmin)
        {
            next();
        }
        else
        {
            res.status(403).status("You are not allowed to do that !");
        }
    })
}

module.exports={VerifyToken,
    VerifyTokenAndAuthorization,
    VerifyTokenAndAdmin
};