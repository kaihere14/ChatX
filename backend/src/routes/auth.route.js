import { Router } from "express";
import {
  login,
  logout,
  profileUpdate,
  signup,
} from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const route = Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);
route.post("/update-profile", verifyJWT, profileUpdate);

export default route;
