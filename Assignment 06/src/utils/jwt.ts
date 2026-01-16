import { AuthPayload } from "../types/jwt.types";
import jwt from "jsonwebtoken";
export const generateToken = async(payload: AuthPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};
export const verifyToken = (token: string):AuthPayload => {
  return  jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload ;
};

