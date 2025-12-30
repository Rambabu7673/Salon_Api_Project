import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  serviceName: { type: String, require: true },
  price: { type: String, require: true },
  description: { type: String,require:true },
  createAt:{type:Date,default:Date.now}
});


export const Service = mongoose.model("service", serviceSchema);
