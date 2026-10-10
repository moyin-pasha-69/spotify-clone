import musicModel from "../models/music.models.js";
import uploadFile from "../services/storage.service.js";
import * as basicOperation from "../utils/basicOperation.utils.js";

async function addMusic(req, res) {
  const file = req.file;
  const { title } = req.body;

  if (basicOperation.isStringEmpty(title) || !file) {
    return res.status(400).json({
      message: "music title or file not found",
    });
  }
  let result;
  try {
    try {
      result = await uploadFile(file.buffer.toString("base64"));
    } catch (error) {
      console.log("error occur during uploading file to  imageKit : ", error);
      return res.status(500).json({
        message: "please try again",
      });
    }
    const music = await musicModel.create({
      uri: result.url,
      title: title,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "Music created Successfully!",
      music: {
        id: music._id,
        title: music.title,
        uri: music.uri,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log("error occur during : ", error);
    return res.status(500).json({
      message: "something went wrong from our side, try again",
    });
  }
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
    return res.status(500).json({
      message: "something went wrong!",
    });
  }
}

async function getMusicById(req, res) {
  try {
    const id = req.params.id;
    const music = await musicModel
      .findById(id)
      .populate("artist", "username email -_id");
    if (!music) {
      return res.status(404).json({
        message: "Empty music",
      });
    }
    res.status(200).json({
      message: "music fetched successfully!",
      music: music,
    });
  } catch (error) {
    console.log("error occur during getting music by id : ", error);
    res.status(500).json({
      message: "something went wrong!",
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
    return res.status(500).json({
      message: "something went wrong from our side, try again",
    });
  }
}

async function updateMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;
    const id = req.params.id;
    const updateDetails = {};
    if (title) {
      updateDetails.title = title;
    }
    if (file) {
      try {
        const result = await uploadFile(file.buffer.toString("base64"));
        updateDetails.uri = result.url;
      } catch (error) {
        return res.status(500).json({
          message: "something went wrong from our side, try again",
        });
      }
    }
    if (basicOperation.checkObjectIsEmpty(updateDetails)) {
      return res.status(400).json({
        message: "At least give one field",
      });
    }
    try {
      const ogMusic = await musicModel
        .findByIdAndUpdate(id, updateDetails, {
          new: true,
          runValidators: true,
        })
        .populate("artist", "username email -_id");
      return res.status(200).json({
        message: "updated successfully!",
        music: ogMusic,
      });
    } catch (error) {
      return res.status(500).json({
        message: "something went wrong from our side, try again",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "unexpected error",
    });
  }
}

export { addMusic, allMusic, getMusicById, deleteMusic, updateMusic };
