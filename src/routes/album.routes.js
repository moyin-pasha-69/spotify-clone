import express from "express";
import createAlbum from "../controllers/album.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware.verifyArtist, createAlbum);

export default router;
