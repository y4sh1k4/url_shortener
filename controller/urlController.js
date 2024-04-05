const URL=require("../model/urlModel");
const ShortUniqueId = require('short-unique-id');
const { randomUUID } = new ShortUniqueId({ length: 8 });

const handleUrlShorten= async(req,res)=>{
    const {url}=req.body;
    if(!url){
        return res.status(400).json({error:"please enter url first"})
    }
    const shortid=randomUUID();
    const data=new URL({
        shortId:shortid,
        redirectURL:url,
        visitHistory:[]
    })
    try{
        await data.save();
        return res.render("home",{
            "id":shortid
        })
    }
    catch(e){
        console.log(e);
    }
}
const handleshortenedUrls=async(req,res)=>{
    const urls=await URL.find({})
    res.render("generatedLinks",{
        URLs:urls
    })
}
const handleClicks=async(req,res)=>{
    const shortId=req.params.shortid;
    try{
        const entry=await URL.findOne({shortId});
        res.json({
            "totalClicks":entry.visitHistory.length
        })
    }
    catch(e){
        console.log(e)
    }
}
const handleDeleteURL=async(req,res)=>{
    const shortId=req.params.shortId
    URL.deleteMany({shortId:shortId})
    res.render("generatedLinks")
}
module.exports={handleUrlShorten,handleshortenedUrls,handleClicks,handleDeleteURL}
