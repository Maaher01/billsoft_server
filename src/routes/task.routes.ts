import { Router } from "express";
import { addCategory } from "../controllers/category.controller";

const router = Router();

router.post("/add", addCategory);

export default router;
