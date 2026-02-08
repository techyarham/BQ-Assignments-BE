import express from "express";
import bookRoutes from "./router/book.route";
import logger from "./middleware/logger.middleware";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/books", bookRoutes);
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
export default app;
