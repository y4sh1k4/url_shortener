const express=require('express');
const app=express();
const PORT=3000;
const mongoose=require('mongoose');
const urlRoute=require("./router/urlRoute");
const staticRoute=require("./router/staticRoute");
const userRoute=require("./router/userRoute")
const URL=require("./model/urlModel");
const path=require("path");
const User=require("./model/userModel")
const {restrictToLoggedInUser}=require("./middleware/restriction")

//mongoDb connection
async function main(){
    mongoose.connect("mongodb+srv://Yashika:sky@cluster0.e0qj0bd.mongodb.net/URLShortener?retryWrites=true&w=majority");
}
main()
.then(()=>{
    console.log("database connected");
})
.catch((e)=>{
    console.log(e);
})

//middleware
app.set("view engine","ejs");
app.set("views",path.resolve("./view"))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/url",restrictToLoggedInUser,urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.get("/url/:shortid",async(req,res)=>{
    const shortId=req.params.shortid;
    const entry= await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                timeStamps: Date.now()
            }
        }
    })
    if(!entry.redirectURL){
        return res.render("home")
    }
    res.redirect(entry.redirectURL)
})

//server
app.listen(PORT,()=>{
    console.log(`Server has been started on port ${PORT}`);
});