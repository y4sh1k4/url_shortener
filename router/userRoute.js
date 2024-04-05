const express=require("express");
const router=express.Router();
const {handleUserSignup,handleUserLogin}=require("../controller/userController")

router
.post("/",handleUserSignup)
.post("/login",handleUserLogin)

module.exports=router;