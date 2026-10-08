import albumModel from "../models/album.model.js";
import jwt from "jsonwebtoken";

async function createAlbum(req, res) {
  const { title, musicIds } = req.body;
  const album = await albumModel.create({
    title,
    musics: musicIds,
    artist: req.user.id,
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
}

export default createAlbum;
