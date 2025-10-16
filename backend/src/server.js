import express from "express";
import "dotenv/config";
import path from "path";
const app = express();
const __dirname = path.resolve();

import auth from "./routes/auth.route.js";
import message from "./routes/message.route.js";
app.use("/api/auth", auth);
app.use("/api/message", message);

//make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
  
  
}

app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
