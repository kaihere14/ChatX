import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
export const verifyJWT = async (req, res, next) => {

  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken) {
      return res.status(401).json({ message: "unauthorized request" });
    }
    try {
      const decoded_token = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.id = decoded_token.id;
    } catch (error) {
      return res.status(401).json({ message: "unauthorized request" });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized request" });
  }
};
