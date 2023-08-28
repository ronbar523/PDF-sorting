const express = require("express");
const Router = express.Router();
const UploadFile = require("../../config/uploadFile");
const UploadFileConroller = require("../controller/uploadFile");
const DownFileConroller = require("../controller/downFile");
const DeleteFileConroller = require("../controller/deleteFile");

Router.post(
  "/upload-file",
  UploadFile.upload.single("file"),
  UploadFileConroller.uploadFile
);

Router.get("/download-file/:id", DownFileConroller.downFile);

Router.delete("/remove-file/:id", DeleteFileConroller.removeFile);

module.exports = Router;
