import { aj } from "../database/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const rateLimit = async (req, res, next) => {
  const decision = await aj.protect(req);
  try {
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Too Many Requests" }));
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No bots allowed" }));
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
      }
    }
    if (decision.results.some(isSpoofedBot)) {
        
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
    }

    next();
  } catch (error) {
    res.send(500).json({ message: "Internal server error" });
    next();
  }
};
