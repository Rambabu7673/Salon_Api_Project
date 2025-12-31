import express from "express";
import {
  createService,
  deleteServiceById,
  getAllService,
  getServiceById,
  updateServiceById,
} from "../Controllers/service.js";
import { isAuthencated } from "../Middlewares/Auth.js";

const router = express.Router();
// Middleware token yehi chalega
// router.use(isAuthencated);

router.post("/service", createService);
// Get all service
router.get("/all", getAllService);

// Get single service by id
router.get("/:id", getServiceById);
// Delete service by id
router.put("/update/:id", updateServiceById);
// Delete service by id
router.delete("/delete/:id", deleteServiceById);

export default router;
