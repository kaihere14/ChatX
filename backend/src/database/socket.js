import {Server } from "socket.io"
import http from "http"
import express  from "express"
import "dotenv/config"
import { verifySocket } from "../middleware/verifySocket.js"

const app = new express()
const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin: [process.env.CLIENT_URL,"http://localhost:5173"],
        credentials : true
    }
})


io.use(verifySocket);

export const getSocketId = (recieverId)=>{
   const scoketId = userSocketMap[recieverId]
   return scoketId
}

const userSocketMap = {}; // {userId : scoketId }

io.on("connection",(socket)=>{
    console.log("A user connected",socket.user.fullName);
    const userId = socket.userId

    userSocketMap[userId] = socket.id

    io.emit('getOnlineUser',Object.keys(userSocketMap))

    socket.on("disconnect",(socket)=>{
    console.log("A user disconnected");
    delete userSocketMap[userId]
    io.emit('getOnlineUser',Object.keys(userSocketMap))

    })

    socket.on("typingStatus",(data)=>{
        const {status,selectedUserId} = data
        if(selectedUserId === userId) return
        const scoketId = userSocketMap[selectedUserId]
        if(scoketId){
            io.to(scoketId).emit("typingStatus",status)
        }
    })
})


export {io,app,server}