import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../model/user.model.js";

export const verifyJWT = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken) {
      return res.status(404).json({ message: "unauthorized request" });
    }

    try {
      const decoded_token = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      const user = await User.findById(decoded_token.id);
      req.user = user;
      return next();
    } catch (error) {
      return res.status(404).json({ message: "unauthorized request" });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized request" });
  }
};
