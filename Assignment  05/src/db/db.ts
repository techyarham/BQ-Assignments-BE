import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export function connectdb() {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
