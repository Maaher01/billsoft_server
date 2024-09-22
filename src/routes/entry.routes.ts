import { Router } from "express";
import { addEntry } from "../controllers/entry.controller";

const router = Router();

router.post("/add", addEntry);

export default router;
