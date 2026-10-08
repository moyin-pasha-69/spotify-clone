import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  musics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "musics",
    },
  ],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const albumModel = mongoose.model("albums", albumSchema);

export default albumModel;
