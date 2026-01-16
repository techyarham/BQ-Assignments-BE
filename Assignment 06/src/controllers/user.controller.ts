import { Request, Response } from "express";
import { User } from "../models/user.model";
import {
  userZod,
  paramsZod,
  updateUserZod,
  loginZod,
} from "../schemas/user.zod";
import { hashPass, verifyPass } from "../utils/hash";
import { AuthPayload } from "../types/jwt.types";
import { generateToken } from "../utils/jwt";
// GEt All Users
export const getAllUsers = async (req: Request, res: Response) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }
  const user = await User.find();
  res.status(200).json(user);
};
// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = userZod.safeParse(req.body);
    if (!success) {
      return res
        .status(400)
        .json({ message: "Enter valid data " + error.issues[0].message });
    }
    data.password = await hashPass(data.password);
    const user = await User.create(data);
    return res
      .status(201)
      .json({ message: "User Created successfully", data: user });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//Get User By Id
export const getUserById = async (req: Request, res: Response) => {
  try {
    if(req.user.role !=="admin"){
      return res.status(403).json({message:"Access Denied"})
    }
    const params = paramsZod.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({
        message: "Enter a valid User ID " + params.error.issues[0].message,
      });
    }
    const user = await User.findById(params.data.id);
    if (!user) {
      return res.status(400).json({ message: "No user Found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" + err });
  }
};
//Update User
export const updateUser = async (req: Request, res: Response) => {
   if(req.user.role !=="admin"){
      return res.status(403).json({message:"Access Denied"})}
  try {
    const params = paramsZod.safeParse(req.params);
    const { success, data, error } = updateUserZod.safeParse(req.body);
    if (!params.success) {
      return res.status(400).json({
        message: "Invalid ID ",
        error: params.error.issues[0].message,
      });
    }
    if (!success) {
      return res
        .status(400)
        .json({ message: "Invalid Data ", error: error.issues[0].message });
    }
    const user = await User.findByIdAndUpdate(params.data.id, data, {
      runValidators: true,
      new: true,
    });
    if (!user) {
      return res.status(400).json({ message: "No user Found" });
    }
    return res
      .status(201)
      .json({ message: "User Updated Successfully", data: user });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error " + err });
  }
};
//Delete User
export const deleteUser = async (req: Request, res: Response) => {
   if(req.user.role !=="admin"){
      return res.status(403).json({message:"Access Denied"})}
  try {
    const { success, data, error } = paramsZod.safeParse(req.params);
    if (!success) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const user = await User.findByIdAndDelete(data.id);
    if (!user) {
      return res.status(400).json({ message: "No user Found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error " + err });
  }
};
//User Login
export const login = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = loginZod.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: error.issues[0].message });
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: "No User Found with this email" });
    }
    const result = await verifyPass(data.password, user.password);
    if (!result) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const payload: AuthPayload = {
      id: user.id,
      role: user.role,
    };
    const token = await generateToken(payload);
    return res
      .status(200)
      .json({ message: "Logged in Successfully ", token });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error " + err });
  }
};
