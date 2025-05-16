import Express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDatabase } from "./config/db";

import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";
import entryRouter from "./routes/entry.routes";

const app: Application = Express();

const PORT = process.env.PORT;

//Middleware
app.use(cors({ credentials: true }));
app.use(Express.json());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/entry", entryRouter);

app.listen(PORT, async () => {
	await connectToDatabase();
	console.info(`Server has started at http://localhost:${PORT}...`);
});
