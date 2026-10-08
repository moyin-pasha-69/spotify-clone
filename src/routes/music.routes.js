import express from "express";
import * as musicController from "../controllers/music.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";

const uploadMusic = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post(
  "/create",
  authMiddleware.verifyArtist,
  uploadMusic.single("uri"),
  musicController.addMusic,
);

router.get("/", authMiddleware.verifyUser, musicController.allMusic);

export default router;
