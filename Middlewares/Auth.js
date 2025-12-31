import jwt from "jsonwebtoken";
import { Register } from "../Models/Register.js";

export const isAuthencated = async (req, res, next) => {
  try {
    // Token 3 tarike se accept karega
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || // Bearer token
      req.header("Auth") ||
      req.header("auth");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Login first (Token missing)", success: false });
    }

    const decode = jwt.verify(token, process.env.JWT_CODE);
    const user = await Register.findById(decode.userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not register", success: false });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
