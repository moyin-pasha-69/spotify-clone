import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "enter title at least 4 characters"],
    maxLength: [15, "enter title under 15 characters"],
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
