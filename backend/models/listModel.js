import mongoose from "mongoose";


const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:30,
        trim:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true, "Please provide user"]
    }
})


export default mongoose.model("List",listSchema);