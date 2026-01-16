import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import { logger } from "./middlewares/logger";
import userRoutes from './routes/user.routes'
const app = express();
app.use(express.json());
connectDB();
app.use(logger);
app.use("/api/users",userRoutes)
app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});
