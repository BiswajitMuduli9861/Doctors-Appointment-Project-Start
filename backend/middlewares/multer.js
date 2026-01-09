import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");   // create folder in backend
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);  // unique name
  }
});

const upload = multer({ storage });
export default upload;
