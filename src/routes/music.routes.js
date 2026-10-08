import express from "express";
import * as musicController from "../controllers/music.controller.js";
import * as albumController from "../controllers/album.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import fileMiddleware from "../middlewares/file.middleware.js";

const router = express.Router();

router.get("/", authMiddleware.verifyUser, musicController.allMusic);
router.get("/:id", authMiddleware.verifyUser, musicController.getMusicById);
router.post(
  "/",
  authMiddleware.verifyArtist,
  fileMiddleware.single("uri"),
  musicController.addMusic,
);
router.delete(
  "/:id",
  authMiddleware.verifyArtist,
  authMiddleware.verifyItsArtist,
  musicController.deleteMusic,
);
router.post("/album", authMiddleware.verifyArtist, albumController.createAlbum);

router.get("/albums", authMiddleware.verifyUser, albumController.getAllAlbums);
router.get(
  "/albums/:id",
  authMiddleware.verifyUser,
  albumController.getAlbumById,
);

export default router;
