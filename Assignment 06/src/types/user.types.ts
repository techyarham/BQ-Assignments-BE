import { Document } from "mongoose"
export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    age:number;
    role:"user"|"admin";
    createdAt:Date;
}
