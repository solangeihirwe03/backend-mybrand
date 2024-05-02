import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL :any = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("database connected successfuly");

})
.catch((error)=>{
    console.log("database connection failed", error)
});