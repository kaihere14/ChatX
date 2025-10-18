import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./database/socket.js";
const __dirname = path.resolve();

app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",// your frontend origin
    credentials: true, // ✅ allow cookies
  })
);
import auth from "./routes/auth.route.js";
import message from "./routes/message.route.js";
import { connectDB } from "./database/index.js";
app.use("/api/auth", auth);
app.use("/api/message", message);

//make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port ", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("Failed to start the server");
  });
