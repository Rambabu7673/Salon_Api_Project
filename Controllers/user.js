import { User } from "../Models/User.js";

export const staffUser = async (req, res) => {
  const { name, phone, role, exprience } = req.body;
  if (!name || !phone || !role || !exprience) {
    return res
      .status(404)
      .json({ message: "All field are required", success: false });
  }
  const existUser = await User.findOne({ name, phone });
  if (existUser) {
    return res
      .status(409)
      .json({ message: "Allready fields user Data", success: false });
  }
  let user = await User.create({
    name,
    phone,
    role,
    exprience,
  });
  return res
    .status(201)
    .json({ message: "User created successfully ", success: true, user });
};

// GetAll Data
export const getAllUserData = async (req, res) => {
  try {
    const getAllData = await User.find();
    if (!getAllData) {
      return res
        .status(404)
        .json({ message: "User Not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Get all user data  ", success: true, getAllData });
  } catch (error) {}
};

// get User By single id
export const getSingleId = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    const getuserId = await User.findById(id);
    if (!getuserId) {
      return res
        .status(404)
        .json({ message: "User Not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "User find successfully", success: true, getuserId });
  } catch (error) {}
};

// Update user by id
export const updateUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res
        .status(404)
        .json({ message: "User Not Updated", success: false });
    }
    return res.status(201).json({
      message: "User Updated are successfully",
      success: true,
      updateUser,
    });
  } catch (error) {}
};

// Deleted are user data
export const deleteUserDataById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(id, req.body, {
      new: true,
    });
    if (!deleteUser) {
      return res
        .status(404)
        .json({ message: "User Not deleted", success: false });
    }
    return res.status(201).json({
      message: "User deleted are successfully",
      success: true,
      deleteUser,
    });
  } catch (error) {}
};
