import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    message:{
        type: String,
        required:true
    }
});
export  const Messages = mongoose.model("Message", messageSchema);