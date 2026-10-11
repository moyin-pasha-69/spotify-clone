import { userModel } from "../models/users.models.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";

async function registerUsers(req, res, next) {
  try {
    const { username, email, password, role } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    console.log(isUserAlreadyExist);
    if (isUserAlreadyExist) {
      return next(new AppError("User already exist", 409));
    }

    const hash = await bcrypt.hash(password, 10);
    let user;
    try {
      user = await userModel.create({
        username: username.trim(),
        email,
        password: hash,
        role,
      });
    } catch (error) {
      return next(new AppError(error.message, 400));
    }

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "user register successfully!",
      user,
    });
  } catch (error) {
    console.log("error occur during creating user : ", error.message);
    return next(new AppError("Internal server error", 500));
  }
}
async function loginUsers(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(404).json({
        message: "invalid credentials",
      });
    }

    const isPasswordMatches = await bcrypt.compare(password, user.password);

    if (!isPasswordMatches) {
      return res.status(404).json({
        message: "wrong password",
      });
    }

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user login successfully!",
      user,
    });
  } catch (error) {
    console.error("error occur during login user ", error);
  }
}
async function logOutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logout  successfully!",
  });
}
export { registerUsers, loginUsers, logOutUser };
