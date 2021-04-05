const uploadRouter = require("express").Router();
const uploadController = require("../controllers/uploadController");
const candidateController = require("../controllers/candidateController");

uploadRouter.post(
  "/",
  uploadController.uploadFile,
  uploadController.readFile,
  candidateController.writeDatabase
);

module.exports = uploadRouter;
