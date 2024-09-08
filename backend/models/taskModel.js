import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide task name"],
        maxlength:40,
        trim:true,
    },
    listName:{
        type:String,
        required:[true,"please provide the list name"]
    },
    description:{
        type:String,
        default:'',
        maxlength:100
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true, "Please provide user"]
    }
});


export default  mongoose.model("Task",taskSchema);