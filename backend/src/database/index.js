import mongoose from "mongoose"

export const connectDB = async()=>{
    if (!process.env.MONGO_URI) {
             throw new Error("MONGO_URI environment variable is not defined");
         }
        
    try {
        await mongoose.connect(process.env.MONGO_URI )
        console.log("Database connected");
        
    } catch (error) {
        console.log("Failed to connect : ",error)
        process.exit(1)
    }
}