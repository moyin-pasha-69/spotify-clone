import multer from "multer";

const uploadMusic = multer({
  storage: multer.memoryStorage(),
});

export default uploadMusic;
