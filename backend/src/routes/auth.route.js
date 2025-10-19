import { Router } from "express";
import {
  login,
  logout,
  profileUpdate,
  signup,
  newTokens,
  forgotOtp,
  chnagePass,
} from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { rateLimit } from "../middleware/ratelimit.js";

const route = Router();
// route.use(rateLimit);

route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);
route.post("/forgotOtp", forgotOtp);
route.post("/changepass", chnagePass);
route.get("/check", verifyJWT, (req, res) => {
  return res.status(200).json(req.user);
});
route.post("/update-profile", verifyJWT, profileUpdate);
route.get("/refresh", newTokens);


export default route;
