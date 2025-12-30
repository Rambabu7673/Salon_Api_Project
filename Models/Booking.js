import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  userEmail: { type: String },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String },

  paymentStatus: { type: String, default: "Unpaid" },
  paymentMethod: { type: String, default: null },
  transactionId: { type: String, default: null },

  status: { type: String, default: "Pending" },
});

// ❗Model name should be meaningful
export const Booking = mongoose.model("Booking", bookingSchema);
