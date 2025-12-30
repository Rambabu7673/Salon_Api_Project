import { Service } from "../Models/Service.js";

export const createService = async (req, res) => {
  try {
    const { serviceName, price, description } = req.body;

    if (!serviceName || !price || !description) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const existService = await Service.findOne({ serviceName });
    if (existService) {
      return res
        .status(409)
        .json({
          message: "service already created successfully",
          success: false,
        });
    }
    const service = await Service.create({ serviceName, price, description });
    return res.status(201).json({
      message: "Service are created successfully",
      success: true,
      service,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all service
export const getAllService = async (req, res) => {
  try {
    const getService = await Service.find();
    if (!getService) {
      return res
        .status(404)
        .json({ message: "Service Not Found", success: false });
    }
    return res
      .status(202)
      .json({
        message: "Get all service show successfully",
        success: true,
        getService,
      });
  } catch (error) {}
};

// Get service by id

export const getServiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleServiceById = await Service.findById(id);
    if (!getSingleServiceById) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res
      .status(202)
      .json({
        message: "Service data are showing",
        success: true,
        getSingleServiceById,
      });
  } catch (error) {}
};

// service data update
export const updateServiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const updateId = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateId) {
      return res
        .status(404)
        .json({ message: "Service are not updated", success: false });
    }
    return res
      .status(202)
      .json({ message: "Service are  updated", success: true, updateId });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete service by id
export const deleteServiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteId = await Service.findByIdAndDelete(id);
    if (!deleteId) {
      return res
        .status(404)
        .json({ message: "Service are not deleted", success: false });
    }
    return res
      .status(202)
      .json({
        message: "Service are  delete successfully",
        success: true,
        deleteId,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
