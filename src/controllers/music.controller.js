import musicModel from "../models/music.models.js";
import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.service.js";

async function addMusic(req, res) {
  // ! first check the user has  token or not in cookies or else is he logged or not
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    // ! if he logged in then check the token is correct or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "you're not allowed to add music",
      });
    }

    const file = req.file;
    const { title } = req.body;

    const result = await uploadFile(file.buffer.toString("base64"));
    const music = await musicModel.create({
      uri: result.url,
      title: title,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "Music created Successfully!",
      music: {
        ID: music._id,
        Title: music.title,
        Uri: music.uri,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log("error is : ", error);
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
}

export { addMusic };
