import jwt from "jsonwebtoken";

async function verifyArtist(req, res, next) {
  // ! first check the user has  token or not in cookies or else is he logged or not
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    // ! if he logged in then check the token is correct or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "you're not have permission to create",
      });
    }

    // ! we sending a   new req.user that holds decoded which helps us  in controllers
    req.user = decoded;

    // ! this  use to go next otherwise it not go forward in path
    next();
  } catch (error) {
    console.log("error occur during verifyingUser : ", error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

async function verifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user" && decoded.role !== "artist") {
      return res.status(403).json({
        message: "you don't have access",
      });
    }
    next();
  } catch (error) {
    console.log("error occur during verifyingUser : ", error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

export { verifyArtist, verifyUser };
