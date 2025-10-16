import { Router } from "express";

const route  = Router()


route.get("/signup", (req, res) => {
    res.send("Signup");
  });
  route.get("/login", (req, res) => {
    res.send("Login enpoint");
  });
  route.get("/logout", (req, res) => {
    res.send("Logout endpoint");
  });

export default route