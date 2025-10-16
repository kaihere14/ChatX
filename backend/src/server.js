import express from "express";
import "dotenv/config";

const app = express();


import auth from "./routes/auth.route.js";
import message from "./routes/message.route.js";
app.use("/api/auth", auth);
app.use("/api/message", message);


app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5500");
});
