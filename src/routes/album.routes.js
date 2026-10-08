import express from "express";
import createAlbum from "../controllers/album.controller.js";

const router = express.Router();

router.post("/create", createAlbum);

export default router;
