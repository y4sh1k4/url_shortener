const User=require("../model/userModel")
const { v4: uuidv4 } = require('uuid');
const {setUser}=require("../utils/userToIdMap")
const handleUserSignup=async(req,res)=>{
    const {name,email,password}=req.body;
    const user=new User({
        name:name,
        email:email,
        password:password
    });
    try{
        await user.save();
        res.redirect("/")
    }
    catch(e){
        console.log(e)
    }
}
const handleUserLogin=async(req,res)=>{
    const {email,password}=req.body;
    const user=User.findOne({email,password});
    const sessionId=uuidv4();
    setUser(sessionId,user)
    res.cookie("uid",sessionId)
    if(!user){
        return res.status(401).json({error:"invalid Username or password"})
    }
    res.redirect("/")
}
module.exports={handleUserSignup,handleUserLogin}