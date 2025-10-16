import { Router } from "express";
import { signup } from "../controller/auth.controller.js";

const route = Router();

route.post("/signup", signup);
route.get("/login", (req, res) => {
  res.send("Login enpoint");
});
route.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});

export default route;
