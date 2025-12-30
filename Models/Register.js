import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  name:{type:String,require:true},
  phone:{type:Number,require:true},
  email:{type:String,require:true},
  password: { type: String, require: true },
  role: {type: String,enum: ["admin", "user"], default: "user"},
 createAt:{type:Date,default:Date.now}
})
export const Register = mongoose.model('register',registerSchema)