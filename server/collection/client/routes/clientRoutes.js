const express = require("express");
const Router = express.Router();
const UploadFile = require("../../../config/uploadFile");
const UploadFileConroller = require("../controller/uploadFile");

Router.post(
  "/upload_file",
  UploadFile.upload.single("file"),
  UploadFileConroller.uploadFile
);


module.exports = Router;
