import express, { Request, Response, } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Home Page");
});
app.get("/user", (req: Request, res: Response) => {
  res.status(200).send("User Page");
});
app.get("/admin", (req: Request, res: Response) => {
  res.status(200).send("Admin Page");
});
app.listen(PORT, () => {
  console.log("Server is Running");
});
