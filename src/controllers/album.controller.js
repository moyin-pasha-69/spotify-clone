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

async function getAllAlbums(req, res) {
  try {
    const albums = await albumModel
      .find()
      .select("title artist")
      .populate("artist", "username email -_id");

    res.status(200).json({
      message: "Album fetched successfully!",
      albums: albums,
    });
  } catch (error) {
    console.log("error occur during getting albums : ", error);
    return res.status(404).json({
      message: "Empty albums",
    });
  }
}

async function getAlbumById(req, res) {
  try {
    const id = req.params.id;
    const album = await albumModel
      .findById(id)
      .populate("artist", "username email -_id")
      .populate("musics", "-_id");

    return res.status(200).json({
      message: "album fetched successfully!",
      albums: album,
    });
  } catch (error) {
    console.log("error occur  during getting album by id : ", error);
    return res.status(404).json({
      message: "something went wrong",
    });
  }
}

export { createAlbum, getAllAlbums, getAlbumById };
