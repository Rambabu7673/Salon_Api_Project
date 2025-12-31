import { Register } from "../Models/Register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  const { name, phone, email, password,role } = req.body;
  console.log(req.body);
  if (!name || !phone || !email || !password || !role) {
    return res.json({ message: "All Field are required", success: false });
  }
  const userExist = await Register.findOne({ email });
  // Check karega data hai ki nhi 
  if (userExist) {
    return res.json({ message: "User Allready existed ", success: false });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  // Create user data
  let user = await Register.create({
    name,
    phone,
    email,
    password: hashpassword,
    role: req.body.role || "user"
  });
  return res.json({
    message: "User Register Successfully ",
    success: true,
    user,
  });
};

// User Login karega
export const userLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.json({message:"All field are required"})
  }
  const user = await Register.findOne({ email })
  if (!user) {
    return res.json({message:"User Not register",success:false})
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.json({message:"Invalid password",success:false})
  }
  // JWT token genrate 
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_CODE,
    { expiresIn: "4d" }
  );
  try {
    return res.json({message:`Welcome ${user.name}`,token,success:true})
  } catch (error) {
    
  }
}


