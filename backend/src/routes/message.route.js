import { Router } from "express";
import { rateLimit } from "../middleware/ratelimit.js";

const route = Router();
route.use(rateLimit);
route.get("/send", (req, res) => {
  res.send("sending msg ");
});

export default route;
