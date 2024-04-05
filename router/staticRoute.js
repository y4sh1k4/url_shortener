const express=require("express");
const router=express.Router();
router.get("/",async(req,res)=>{
    res.render("home")
})
router.get("/signup",async(req,res)=>{
    res.render("signup")
})
router.get("/login",async(req,res)=>{
    res.render("login")
})

module.exports=router;