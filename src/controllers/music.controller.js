import musicModel from "../models/music.models.js";
import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.service.js";

async function addMusic(req, res) {
  const file = req.file;
  const { title } = req.body;

  const result = await uploadFile(file.buffer.toString("base64"));
  const music = await musicModel.create({
    uri: result.url,
    title: title,
    artist: req.user.id,
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
}

export { addMusic };
