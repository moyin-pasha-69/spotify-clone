import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.registerUsers);
router.post("/login", authController.loginUsers);
router.post("/logout", authController.logOutUser);

export default router;
