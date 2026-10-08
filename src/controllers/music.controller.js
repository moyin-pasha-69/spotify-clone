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

async function allMusic(req, res) {
  try {
    // ! this populate function give us detail of artist instead  of id
    // ? automatically replaces a referenced ObjectId field in a document with the actual document data from another collection
    const music = await musicModel
      .find()
      .populate("artist", "username email -_id");

    res.status(200).json({
      message: "music fetched successfully!",
      musics: music,
    });
  } catch (error) {
    console.log("error occur during showing all music : ", error);
    return res.status(204).json({
      message: "Empty musics",
    });
  }
}

export { addMusic, allMusic };
