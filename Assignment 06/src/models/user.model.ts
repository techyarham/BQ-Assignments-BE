import mongoose from "mongoose";
import { IUser } from "../types/user.types";
 const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true , unique:true},
  age: { type: Number, min: 18, required: true },
  password: { type: String, required: true },
  role: { type: String,enum:["user","admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});
export const User = mongoose.model<IUser>("user",UserSchema)
