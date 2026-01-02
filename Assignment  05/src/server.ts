import express, { Request, Response } from "express";
import { logger } from "./middlewares/logger";
import { connectdb } from "./db/db";
import productRoute from "./routes/product.routes";
const app = express();
app.use(express.json());
app.use(logger);
connectdb();
app.get("/", (req: Request, res: Response) => {
  res.json({ messaage: "Hello World" });
});
app.use("/products", productRoute);
app.listen(3000, () => {
  console.log("Server Is Running");
});
