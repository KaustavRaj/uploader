const express = require("express");
const multer = require("multer");
const cors = require("cors");
const readXlsxFile = require("read-excel-file/node");

const PORT = process.env.PORT || 15000;
const uploads_folder = "uploads";

const app = express();
app.use(cors());

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploads_folder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

app.get("/data", (req, res) => {
  readXlsxFile("uploads/data.xlsx").then((rows) => res.json(rows));
});

app.post("/api/upload", (req, res) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(500).json(error);
    } else if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).send("Successfully uploaded file");
  });
});

app.listen(PORT, () => {
  console.log("Server is running at port : ", PORT);
});
