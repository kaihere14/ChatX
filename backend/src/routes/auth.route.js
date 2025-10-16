import { Router } from "express";
import {
  login,
  logout,
  profileUpdate,
  signup,
} from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { rateLimit } from "../middleware/ratelimit.js";

const route = Router();
route.get("/test", rateLimit, (req, res) => {
  res.send("testing routes");
});
route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);
route.post("/update-profile", verifyJWT, profileUpdate);
route.get("/update-profile", verifyJWT, (req, res) => {
  res.status(200).json(req.user);
});

export default route;
