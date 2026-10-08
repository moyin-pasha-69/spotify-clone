import albumModel from "../models/album.model.js";
import jwt from "jsonwebtoken";

async function createAlbum(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "you're not allowed to create an album",
      });
    }

    const { title, musicIds } = req.body;
    const album = await albumModel.create({
      title,
      musics: musicIds,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "Album create successfully!",
      album: {
        id: album._id,
        title: album.title,
        music_list: album.musics,
        artist: album.artist,
      },
    });
  } catch (error) {
    console.log(err);
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
}

export default createAlbum;
