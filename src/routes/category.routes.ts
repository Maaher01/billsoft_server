import { Router } from "express";
import {
	displayParentCategories,
	displaySubCategories,
	categoryEdit,
	addCategory,
	categoryDelete,
} from "../controllers/category.controller";

const router = Router();

router.get("/", displayParentCategories);
router.get("/:parentCategory", displaySubCategories);
router.post("/add", addCategory);
router.delete("/:id", categoryDelete);
router.put("/:id", categoryEdit);

export default router;
