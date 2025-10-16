import { aj } from "../database/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const rateLimit = async (req, res, next) => {
  
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Too Many Requests" }));
        return;
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No bots allowed" }));
        return;
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
        return;
      }
    }
    if (decision.results.some(isSpoofedBot)) {
        
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
        return;
    }

    next();
  } catch (error) {
    res.send(500).json({ message: "Internal server error" });
  }
};
