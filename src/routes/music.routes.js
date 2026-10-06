import express from "express";
import * as musicMiddleware from "../middlewares/music.middlewares.js";

const router = express.Router();

router.post("/create", musicMiddleware.addMusic);

export default router;
