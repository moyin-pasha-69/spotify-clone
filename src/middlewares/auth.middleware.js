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

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

export default verifyArtist;
