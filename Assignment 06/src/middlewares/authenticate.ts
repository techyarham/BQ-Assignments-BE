import  {Request,Response,NextFunction} from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticate=async(req:Request,res:Response,next:NextFunction)=>{
const token = req.headers.authorization?.split(" ")[1];
if(!token){
    return res.status(404).json({message:"Token not found , please login"})
}
try{
const decoded = verifyToken(token);
req.user=decoded;
next();
}catch(err){
 return res.status(401).json({ message: "Invalid or expired token"+err });
}
}

