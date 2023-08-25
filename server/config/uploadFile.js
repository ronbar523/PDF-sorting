const multer = require("multer");

const storage = multer.memoryStorage(); // Use memory storage to handle the file buffer

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only PDF format allowed!"));
    }
  },
});


module.exports = {
  upload,
};
