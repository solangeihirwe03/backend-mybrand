import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const uri: any = process.env.MONGO_URL


mongoose.connect(uri)
.then(()=>{
    console.log("database connected successfuly");

})
.catch((error)=>{
    console.log("database connection failed", error)
});