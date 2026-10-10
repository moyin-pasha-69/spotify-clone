import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import musicRouter from "./routes/music.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);
app.use(errorHandler);

export { app };
