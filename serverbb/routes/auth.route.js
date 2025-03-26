import express from "express";
import { register, login, forgotPassword, resetPassword, checkUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/check-user", checkUser);

export default router;
