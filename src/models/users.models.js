import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
    unique: true,
    trim: true,
    minLength: [4, "enter username at least 4 characters"],
    maxLength: [15, "enter username under 15 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    trim: true,
    enum: {
      values: ["user", "artist"],
      message: `Either selected user or artist not {VALUE}`,
    },
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);

export { userModel };
