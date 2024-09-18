import Express, { Application } from "express";
import cors from "cors";
import "dotenv/config";

import categoryRouter from "./routes/task.routes";
import { connectToDatabase } from "./config/db";

const app: Application = Express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors({ credentials: true }));
app.use(Express.json());

//Routes
app.use("/api/category", categoryRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.info(`Server has started at http://localhost:${PORT}...`);
});
