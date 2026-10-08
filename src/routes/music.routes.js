import express from "express";
import * as musicController from "../controllers/music.controller.js";
import * as albumController from "../controllers/album.controller.js";
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
router.post("/album", authMiddleware.verifyArtist, albumController.createAlbum);

router.get("/", authMiddleware.verifyUser, musicController.allMusic);
router.get("/albums", authMiddleware.verifyUser, albumController.getAllAlbums);
router.get(
  "/albums/:id",
  authMiddleware.verifyUser,
  albumController.getAlbumById,
);

export default router;
