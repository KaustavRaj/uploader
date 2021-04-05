const async = require("async");
const { candidateModal } = require("../models");

const verifyDetails = (row, callback) => {
  // name & email required, otherwise won't insert;
  // returns callback with params (error, canBeInserted)

  if (!row["Name of the Candidate"] || !row["Email"]) {
    console.log("Name/email not found...");
    process.nextTick(() => callback(null, false));
  } else {
    candidateModal.exists({ Email: row["Email"] }, (error, exists) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, !exists);
      }
    });
  }
};

const writeSingleRow = (row, callback) => {
  verifyDetails(row, (error, canBeInserted) => {
    if (error) {
      callback(error);
    } else if (canBeInserted) {
      candidateModal.create(row, (error) => {
        callback(error);
      });
    } else {
      console.log("Found a duplicate entry");
      process.nextTick(callback);
    }
  });
};

const writeDatabase = async (req, res, next) => {
  let data = res.locals.jsonFile;
  console.log("Total entries to insert :", data.length);

  async.eachSeries(data, writeSingleRow, (error) => {
    console.log("Inserting entries complete !");
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
};

module.exports = { writeDatabase };
