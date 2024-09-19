import { Router } from "express";
import {
  displayParentCategories,
  displaySubCategories,
  addCategory,
  categoryDelete,
} from "../controllers/category.controller";

const router = Router();

router.get("/", displayParentCategories);
router.get("/:id", displaySubCategories);
router.post("/add", addCategory);
router.delete("/:id", categoryDelete);

export default router;
