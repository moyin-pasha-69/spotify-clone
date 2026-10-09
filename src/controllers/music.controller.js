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
    return res.status(404).json({
      message: "Empty musics",
    });
  }
}

async function getMusicById(req, res) {
  try {
    const id = req.params.id;
    const music = await musicModel
      .findById(id)
      .populate("artist", "username email -_id");
    res.status(200).json({
      message: "music fetched successfully!",
      music: music,
    });
  } catch (error) {
    console.log("error occur during getting music by id : ", error);
    res.status(404).json({
      message: "music not found",
    });
  }
}

async function deleteMusic(req, res) {
  try {
    const id = req.params.id;
    await musicModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Music deleted successfully!",
    });
  } catch (error) {
    console.log("error occur during deleting an music :  ", error);
    return res.status(404).json({
      message: "music not found",
    });
  }
}

async function updateMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;
    const id = req.params.id;

    if (!file) {
      const music = await musicModel.findOneAndUpdate(
        { _id: id },
        { title: title },
      );
      return res.status(201).json({
        message: "Music updated Successfully!",
        music: {
          ID: music._id,
          Title: title,
          Uri: music.url,
          artist: music.artist,
        },
      });
    } else if (!title) {
      const result = await uploadFile(file.buffer.toString("base64"));
      const music = await musicModel.findOneAndUpdate(
        { _id: id },
        {
          uri: result.url,
        },
      );
      return res.status(201).json({
        message: "Music updated Successfully!",
        music: {
          ID: music._id,
          Title: title,
          Uri: result.url,
          artist: music.artist,
        },
      });
    }
    const result = await uploadFile(file.buffer.toString("base64"));
    const music = await musicModel.findOneAndUpdate(
      { _id: id },
      {
        uri: result.url,
        title: title,
      },
    );
    return res.status(201).json({
      message: "Music updated Successfully!",
      music: {
        ID: music._id,
        Title: title,
        Uri: result.url,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "enter at least one field",
    });
  }
}

export { addMusic, allMusic, getMusicById, deleteMusic, updateMusic };
