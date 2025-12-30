import express from "express";
import { isAuthencated } from "../Middlewares/Auth.js";
import {
  deleteBookingData,
  getAllBooking,
  getBookingById,
  getUpdateById,
  userBooking,
} from "../Controllers/booking.js";
const router = express.Router();

// Midleware token yehi se check karega
router.use(isAuthencated)
// create Booking api
router.post("/booking", userBooking);
// get all booking data
router.get("/all", getAllBooking);
// getbooking by id
router.get("/:id", getBookingById);
// Updated By Booking id
router.put("/update/:id", getUpdateById);
// Delete are booking By id
router.delete("/delete/:id", deleteBookingData);

export default router;
