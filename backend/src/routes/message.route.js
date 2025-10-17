import { Router } from "express";
import { rateLimit } from "../middleware/ratelimit.js";
import {
  chats,
  getAllContacts,
  getMessageBId,
  sendMsg,
} from "../controller/message.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const route = Router();

route.use( verifyJWT);

route.get("/contacts", getAllContacts);
route.get("/chats", chats);
route.get("/:id", getMessageBId);
route.post("/send/:id", sendMsg);

export default route;
