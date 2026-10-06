import { userModel } from "../models/users.models.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function registerUsers(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "user already exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
    });

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user register successfully!",
      user,
    });
  } catch (error) {
    console.log("error occur during creating user", error);
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
export { registerUsers, loginUsers };
