import { Router } from "express";
import { login, logout, signup } from "../controller/auth.controller.js";

const route = Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);

export default route;
