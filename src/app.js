import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import musicRouter from "./routes/music.routes.js";
import albumRouter from "./routes/album.routes.js";
import multer from "multer";

const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);
app.use("/api/album", albumRouter);

export { app };
