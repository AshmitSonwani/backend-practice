import mongoose, { Mongoose } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB= async ()=>{
    try {

        const ci= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongo Db connected || DB:Host ${ci}`)

    } catch (error) {
        console.log("Mongo DB connection error",error)
        process.exit(1);
    }
}

export default connectDB;