import express from "express";
import * as musicController from "../controllers/music.controller.js";
import multer from "multer";

const uploadMusic = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/create", uploadMusic.single("uri"), musicController.addMusic);

export default router;
