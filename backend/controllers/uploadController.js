const multer = require("multer");
const readXlsxFile = require("read-excel-file/node");
const config = require("../config");

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, config.app.upload_folder);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const uploadFile = multer({ storage: storage }).single("file");

/**
 *
 * @param {*} keys header of excel file (an array)
 * @param {*} values each row in excel file (an array)
 * @returns an object to be inserted in mongodb
 */
const transformRow = (keys, values) => {
  let newRow = {};
  keys.forEach((key, index) => {
    if (key === "Mobile No.") {
      newRow["Mobile No"] = values[index];
    } else {
      newRow[key] = values[index];
    }
  });
  return newRow;
};

const readFile = (req, res, next) => {
  console.log("upload successful !");

  readXlsxFile(req.file.path).then((rows) => {
    let [header, ...body] = rows;
    res.locals.jsonFile = body.map((row) => transformRow(header, row));
    return next();
  });
};

module.exports = { uploadFile, readFile };
