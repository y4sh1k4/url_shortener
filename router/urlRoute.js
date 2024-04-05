const express=require("express");
const router=express.Router();
const {handleUrlShorten,handleshortenedUrls,handleClicks,handleDeleteURL}=require("../controller/urlController");
router
.get("/",handleshortenedUrls)
.get("/analytics/:shortid",handleClicks)
.post("/",handleUrlShorten)
.delete("/",handleDeleteURL)
module.exports=router;
