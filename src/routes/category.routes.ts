import { Router } from "express";
import {
  displayAllCategories,
  displayParentCategories,
  displaySubCategories,
  categoryEdit,
  addCategory,
  categoryDelete,
} from "../controllers/category.controller";

const router = Router();

router.get("/", displayAllCategories);
router.get("/parent", displayParentCategories);
router.get("/:parentCategory", displaySubCategories);
router.post("/add", addCategory);
router.delete("/:id", categoryDelete);
router.put("/:id", categoryEdit);

export default router;
