import { Router } from "express";
import { addEntry, entryEdit } from "../controllers/entry.controller";

const router = Router();

router.post("/add", addEntry);
router.patch("/:id", entryEdit);

export default router;
