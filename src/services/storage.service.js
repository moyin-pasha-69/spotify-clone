import ImageKit from "@imagekit/nodejs";

const ImageKitFile = new ImageKit({
  privateKey: process.env.IMG_KIT_SECRET,
});
async function uploadFile(file) {
  try {
    const response = await ImageKitFile.files.upload({
      file: file,
      fileName: "music_" + Date.now(),
      folder: "spotify-clone/musics",
    });

    return response;
  } catch (error) {
    console.error("Error occur during uploading file to imagekit : ", error);
    return response;
  }
}
async function deleteFile(req, res) {
  // const delete = await ImageKit.files.delete({
  //   file:
  // })
}

export default uploadFile;
