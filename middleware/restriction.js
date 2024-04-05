const {getUser}=require("../utils/userToIdMap")
const restrictToLoggedInUser=async(req,res,next)=>{
    const userId=res.cookies?.uid;
    if(!userId){
        res.render("login")
    }
    const user=getUser(userId)
    if(!user){
        res.render("login")
    }
    req.user=user
    return next()
}
module.exports={restrictToLoggedInUser}