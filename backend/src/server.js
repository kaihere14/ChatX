import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser())
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
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port ", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("Failed to start the server");
  });
