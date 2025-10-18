import  jwt  from "jsonwebtoken";
import { User } from "../model/user.model.js";
import "dotenv/config"



export const verifySocket = async(socket,next)=>{
    try {
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

        if (!token) {
            console.log("Socket connection rejected: No token provided");
            return next(new Error("Unauthorized - No Token Provided"));
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) {
            console.log("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized - Invalid Token"));
            }


            // find the user fromdb
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
            console.log("Socket connection rejected: User not found");
            return next(new Error("User not found"));
            }

            socket.user = user,
            socket.userId = user._id.toString()

            console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

            next()
    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized - Authentication failed"));    
    }
}