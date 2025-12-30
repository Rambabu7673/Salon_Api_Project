import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
  role: { type: String, require: true }, 
  exprience: { type: String },
  createAt: { type: Date, default: Date.now },
});

export const User =mongoose.model('staffData',staffSchema)