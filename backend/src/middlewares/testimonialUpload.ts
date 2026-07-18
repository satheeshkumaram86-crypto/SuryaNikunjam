import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {

  if (file.mimetype.startsWith("image/")) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only image files are allowed."
      )
    );

  }

};


export default multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

});