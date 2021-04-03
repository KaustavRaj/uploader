const candidateModal = require("../models/candidate");

function transformRow(keys, values) {
  let newRow = {};
  keys.forEach((key, index) => (newRow[key] = values[index]));
  return newRow;
}

function verifyDetails(row, onSuccess, onError) {
  // name & email required
  if (!row["Name of the Candidate"] || !row["Email"]) {
    return onSuccess(false);
  }

  // duplicate email check
  candidateModal.find({ Email: row["Email"] }, (error, candidate) => {
    if (error) onError(error);
    return onSuccess(candidate == null);
  });
}

function uploadSingleRow(row, onError) {
  const onSuccess = (canBeInserted) => {
    if (canBeInserted) {
      candidateModal.create(row, (error) => {
        if (error) onError(error);
      });
    }
  };

  verifyDetails(row, onSuccess, onError);
}

function uploadCandidates(req, res) {
  const [header, body] = res.locals.jsonFile;
  body.forEach((row) =>
    uploadSingleRow(transformRow(header, row), (error) => {
      console.error(error);
      return res.status(500);
    })
  );
  // HERE RETURN SUCCESS MESSAGE IF FINISHED
}

module.exports = uploadCandidates;
