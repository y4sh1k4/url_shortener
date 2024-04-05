const mongoose=require("mongoose");

const URLSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[
        {
        timeStamps:{
            type:Number
        }
    }
    ]
},{timestamps:true});
const URL=mongoose.model("URL",URLSchema);

module.exports=URL;