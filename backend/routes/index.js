const baseRouter = require("express").Router();
const uploadRouter = require("./upload");

baseRouter.use("/api/upload", uploadRouter);

module.exports = baseRouter;
