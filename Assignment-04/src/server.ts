import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import { logger } from "./middlewares/logger.middleware";
import dotenv from "dotenv";
const app = express();
const PORT = 3000;
dotenv.config();

app.use(express.json());
app.use(logger);

app.use("/users", userRoutes);
app.use("/products", productRoutes);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
