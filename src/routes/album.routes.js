import express from "express";
import createAlbum from "../controllers/album.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createAlbum);

export default router;
