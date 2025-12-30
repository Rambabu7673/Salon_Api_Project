import jwt from 'jsonwebtoken'
import { Register } from '../Models/Register.js'

export const isAuthencated = async (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    return res.status(400).json({message:"Login first",success:false})
  }
  const decode = jwt.verify(token, process.env.JWT_CODE);
  const id = decode.userId;
  const user = await Register.findById(id);
  if (!user) {
    return res.json({message:"User not register",success:false})
  }
  req.user = user;
  next()
}