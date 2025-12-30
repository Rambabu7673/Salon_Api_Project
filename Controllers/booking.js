import { Booking } from "../Models/Booking.js";

export const userBooking = async (req, res) => {
  try {
    const {
      userName,
      userPhone,
      userEmail,
      service,
      date,
      time,
      paymentStatus,
      paymentMethod,
      transactionId,
    } = req.body;

    if (!userName || !userPhone || !service || !date || !time) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    req.body.status = "Pending";
    req.body.userEmail = userEmail || "";
    
    if (paymentStatus == "Paid") {
      req.body.status = "Confirmed";
    } else {
      req.body.status = "Pending";
    }

    req.body.paymentStatus = paymentStatus || "Unpaid";
    req.body.paymentMethod = paymentMethod || null;
    req.body.transactionId = transactionId || null;

    const existedUser = await Booking.findOne({ userPhone, time, date });
    if (existedUser) {
      return res
        .status(409)
        .json({ message: "User Already Exist", success: false });
    }

    const user = await Booking.create(req.body);

    return res.status(201).json({
      message: "Booking Created Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error); 
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// Get all  booking
export const getAllBooking = async (req, res) => {
  try {
    const getAll = await Booking.find();
    if (!getAll) {
      return res.json({ message: "User not found" });
    }
    return res.json({ message: "Get all booking data", success: true, getAll });
  } catch (error) {}
};

// Get booking by id
export const getBookingById = async (req, res) => {
  const id = req.params.id;
  const bookingId = await Booking.findById(id);
  if (!bookingId) {
    return res.json({ message: "user not found", success: false });
  }
  return res.json({
    message: "Booking are showing successfully",
    success: true,
    bookingId,
  });
};
// Update By booking by id

export const getUpdateById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const updateBooking = await Booking.findByIdAndUpdate(id,req.body,{new:true});
  if (!updateBooking) {
    return res.json({ message: "Booking are not updatetd", success: false });
  }
  return res.json({
    message: "Booking are updated successfully ",
    success: true,
    updateBooking,
  });
};

// Delete By booking id

export const deleteBookingData = async (req, res) => {
  const id = req.params.id;

  const deleteBookindId = await Booking.findByIdAndDelete(id);
  if (!deleteBookindId) {
    return res.status(404).json({message:"Booking are not delete try again",success:false})
  }
  return res.status(201).json({message:"Booking are deleted successfully ",success:true,deleteBookindId})
}
