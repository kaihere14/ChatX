import { Router } from "express";

const route = Router();

route.get("/send",
  (req, res) => {
    res.send("sending msg ");
  });

export default route;
