import { Router } from "express";
import { signup, login, forgotPassword } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/forgot-password", forgotPassword);

export default router;
