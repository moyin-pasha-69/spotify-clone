import express from "express";
import * as authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", authMiddlewares.registerUsers);
router.post("/login", authMiddlewares.loginUsers);

export default router;
