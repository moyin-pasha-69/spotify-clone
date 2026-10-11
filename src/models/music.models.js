import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [3, "enter title at least 3 characters"],
    maxLength: [15, "enter title under 15 characters"],
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const musicModel = mongoose.model("musics", musicSchema);

export default musicModel;
